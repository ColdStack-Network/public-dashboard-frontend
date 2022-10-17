import React, {useEffect, useState} from 'react';
import style from './supportPage.module.scss';
import Button from "../../components/UI/Button/Button";
import SupportItem from "../../components/UI/SupportItem/SupportItem";
import CreateTicketModal from "../../components/UI/Modal/CreateTicketModal/CreateTicketModal";
import {useDispatch, useSelector} from "react-redux";
import {TStore} from "../../reducers";
import {formatDateTransactions, isFull} from "../../helpers/common";
import EmptyList from "../../components/EmptyList/EmptyList";
import SvgEmptyTickets from "../../icons/EmptyTickets";
import {ITicket} from "../../actions/interfaces";
import DeleteModal from "../../components/UI/Modal/DeleteModal/DeleteModal";
import {getEmailSettings} from "../../modules/user/actions";
import {createTicket, deleteTicket, getSupportData, getTickets, setStatusTicket} from '../../Redux/account/Actions/accountActions';

const SupportPage: React.FC<any> = () => {
  const [loading, setLoading] = useState(true);
  const [tabs, setTabs] = useState(0);
  const [modal, setModal] = useState(false);
  const [modalClose, setModalClose] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [currentTicket, setCurrentTicket] = useState(null);
  const [files, setFiles] = useState([] as any);
  const onUploadFilesLocal=(newFiles: any)=>{
    setFiles([...newFiles, ...files])
  }
  const onDeleteFileLocal = (file)=>{
    const idx = files.findIndex((elem)=>elem.filepath === file.filepath)
    if (idx>=0){
      let newArr= [...files.slice(0, idx), ...files.slice(idx+1)];
      setFiles(newArr);
    }
  }

  const dispatch = useDispatch();
  useEffect(()=>{
    /*dispatch(getTickets({status: "open", afterLoad: ()=>{setLoading(false)}}))*/
    dispatch(getSupportData({status: "open", afterLoad: ()=>{setLoading(false)}}))
  },[dispatch])

  useEffect(() => {
    dispatch(getEmailSettings());
    // }
  }, [dispatch]);

  function onCreateTicket(params: ITicket){
    console.log("params",params);
    dispatch(createTicket(params));
  }

  const tickets = useSelector((state: TStore)=>{return state.account.tickets})
  const topics = useSelector((state: TStore)=>{return state.account.topics})
  const emailProps = useSelector((state: TStore) => state?.user?.email);

  const onDeleteTicket = (id)=>{
    return ()=> {
      dispatch(deleteTicket(`${id}`));
      setModalDelete(false);
    }
  }
  const onCloseTicket=(id)=>{
    return ()=> {
      dispatch(setStatusTicket({id: `${id}`, status: 'close'}));
      setModalClose(false);
    }
  }
  const onClickTicketDelete = (id)=>{return ()=>{ setCurrentTicket(id); setModalDelete(true)}}
  const onClickTicketClose = (id)=>{return ()=>{setCurrentTicket(id); setModalClose(true)}}

  return (
    <div>
      <div className={style.headerRow}>
        <div className={`${style.titleRow} ${style.titleRowSupport}`}>
          <div className={`${style.pageTitleCommon} ${style.pageTitle}`}>
            Support
          </div>
          <div>
            <Button color={"primary"} size={"big"} onClickHandler={()=>{setModal(true)}}>Create ticket</Button>
          </div>
        </div>
      </div>
      <div>

        <div className={style.block}>
          <div className={style.headerBlockTabsTitleRow}>
            <div className={style.headerBlockTabs}>My Tickets</div>
            <div className={style.tabs}>
              <div className={`${style.tab} ${tabs === 0 && style.tabActive}`} onClick={()=>{
                if (tabs!==0) {setLoading(true);
                  dispatch(getTickets({status: "open", afterLoad: ()=>{setLoading(false)}}))
                }
                setTabs(0)}}>
                Open
              </div>
              <div className={`${style.tab} ${tabs === 1 && style.tabActive}`} onClick={()=>{
                if (tabs!==1) {
                  setLoading(true);
                  dispatch(getTickets({status: "close", afterLoad: ()=>{setLoading(false)}}))
                }
                setTabs(1)}}>
                Closed
              </div>
            </div>
          </div>
          <div style={{position: "relative"}}>
            {tabs === 0 && <div>
              {
                isFull(tickets) && tickets?.[0]?.status === "open" ? tickets.map((ticket)=>{
                return(
                  <SupportItem text={ticket?.ticketDetails} date={formatDateTransactions(ticket?.updatedAt)}
                               isClosed={false} categoryText={ticket?.topic} isRead={!ticket?.unreadMessage}
                               onClickDelete={onClickTicketClose(ticket?.id)}
                  />
                )
              }) :   <EmptyList loading={loading} onClick={()=>{setModal(true)}} textButton={"Create ticket"} icon={<SvgEmptyTickets/>} noBorder={true}>
                       You don't have any open tickets
                     </EmptyList>
              }
            </div>}
            {tabs === 1 && !loading && <div>
              {isFull(tickets) && tickets?.[0]?.status === "close" ? tickets.map((ticket)=>{
                return(
                  <SupportItem text={ticket?.ticketDetails} date={formatDateTransactions(ticket?.updatedAt)}
                               isClosed={true} categoryText={ticket?.topic} isRead={!ticket?.unreadMessage}
                               onClickDelete={onClickTicketDelete(ticket?.id)}
                  />
                )
              }) :   <EmptyList onClick={()=>{}} noButton={true} textButton={"Create ticket"} icon={<SvgEmptyTickets/>} noBorder={true}>
                You don't have any closed tickets
              </EmptyList>
              }
                {/*<SupportItem text={"How can I find out the current storage prices?"} date={"19.07.2021 13:32"} isClosed={true} categoryText={"Billing"}  isRead={true}/>
                <SupportItem text={"What is the maximum file size that can be uploaded?"} date={"27.07.2021 11:23"} isClosed={true} categoryText={"Storage"}  isRead={true}/>*/}
            </div>}

           {/* <EmptyList onClick={()=>{}} textButton={"Create ticket"} icon={<SvgEmptyTickets/>} noBorder={true}>
              You don't have any open tickets
            </EmptyList>*/}
            <CreateTicketModal disabled={false}
                               onUploadFiles={onUploadFilesLocal}
                               onDeleteUploadFile={onDeleteFileLocal}
                               files={files}
                               email={emailProps.email}
                               emailVerified={emailProps.emailVerified}
                               visible={modal}
                               topics={topics}
                               onClose={()=>{setModal(false)}}
                               onCreateTicket={onCreateTicket}/>

            <DeleteModal visible={modalClose} onClose={()=>{setModalClose( false)}} onSubmit={onCloseTicket(currentTicket)}
                         title={"Close ticket"}
                         text={`Are you sure you want to close ticket?`} textBtnDelete={"Close"}/>
            <DeleteModal visible={modalDelete} onClose={()=>{setModalDelete( false)}} onSubmit={onDeleteTicket(currentTicket)}
                         title={"Delete ticket"}
                         text={`Are you sure you want to delete ticket?`} textBtnDelete={"Delete"}/>

          </div>
        </div>

      </div>


    </div>
  )
}
export default SupportPage;



