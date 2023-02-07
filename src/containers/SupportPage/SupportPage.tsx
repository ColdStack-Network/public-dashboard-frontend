import React, { useEffect, useState } from "react";
import style from "./supportPage.module.scss";
import Button from "../../components/UI/Button/Button";
import SupportItem from "../../components/UI/SupportItem/SupportItem";
import { CreateTicketModal } from "../../components/UI/Modal/CreateTicketModal/CreateTicketModal";
import { useDispatch, useSelector } from "react-redux";
import { formatDateTransactions, isFull } from "helpers/common";
import EmptyList from "../../components/EmptyList/EmptyList";
import SvgEmptyTickets from "../../icons/EmptyTickets";
import { ITicket } from "actions/interfaces";
import { DeleteModal } from "../../components/UI/Modal/DeleteModal/DeleteModal";
import { getEmailSettings } from "Redux/user/Actions/userActions";
import {
  createTicket,
  deleteTicket,
  getSupportData,
  getTickets,
  setStatusTicket,
} from "Redux/account/Actions/accountActions";
import { selectTickets } from "Redux/account/Selectors/selectTickets";
import { selectTopics } from "Redux/account/Selectors/selectTopics";
import { selectEmail } from "Redux/user/Selectors/selectEmail";
import { UploadFileType } from "models/UploadFileType";

const SupportPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [tabs, setTabs] = useState(0);
  const [modal, setModal] = useState(false);
  const [modalClose, setModalClose] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [currentTicket, setCurrentTicket] = useState<string | null>(null);
  const [files, setFiles] = useState<UploadFileType[]>([]);
  const tickets = useSelector(selectTickets);
  const topics = useSelector(selectTopics);
  const emailProps = useSelector(selectEmail);

  const dispatch = useDispatch();
  const onUploadFilesLocal = (newFiles: UploadFileType[]) => {
    setFiles([...newFiles, ...files]);
  };
  const onDeleteFileLocal = (file: UploadFileType) => {
    const idx = files.findIndex((elem) => elem.filepath === file.filepath);
    if (idx >= 0) {
      let newArr = [...files.slice(0, idx), ...files.slice(idx + 1)];
      setFiles(newArr);
    }
  };
  function onCreateTicket(params: ITicket) {
    dispatch(createTicket(params));
  }
  const onDeleteTicket = (id: string | null) => {
    return () => {
      dispatch(deleteTicket(`${id}`));
      setModalDelete(false);
    };
  };
  const onCloseTicket = (id: string | null) => {
    return () => {
      dispatch(setStatusTicket({ id: `${id}`, status: "close" }));
      setModalClose(false);
    };
  };
  const onClickTicketDelete = (id: string) => {
    return () => {
      setCurrentTicket(id);
      setModalDelete(true);
    };
  };
  const onClickTicketClose = (id: string) => {
    return () => {
      setCurrentTicket(id);
      setModalClose(true);
    };
  };

  useEffect(() => {
    dispatch(getEmailSettings());
  }, [dispatch]);
  useEffect(() => {
    dispatch(
      getSupportData({
        status: "open",
        afterLoad: () => {
          setLoading(false);
        },
      })
    );
  }, [dispatch]);

  return (
    <div>
      <div className={style.headerRow}>
        <div className={`${style.titleRow} ${style.titleRowSupport}`}>
          <div className={`${style.pageTitleCommon} ${style.pageTitle}`}>Support</div>
          <div>
            <Button
              color={"primary"}
              size={"big"}
              onClickHandler={() => {
                setModal(true);
              }}
            >
              Create ticket
            </Button>
          </div>
        </div>
      </div>
      <div>
        <div className={style.block}>
          <div className={style.headerBlockTabsTitleRow}>
            <div className={style.headerBlockTabs}>My Tickets</div>
            <div className={style.tabs}>
              <div
                className={`${style.tab} ${tabs === 0 && style.tabActive}`}
                onClick={() => {
                  if (tabs !== 0) {
                    setLoading(true);
                    dispatch(
                      getTickets({
                        status: "open",
                        afterLoad: () => {
                          setLoading(false);
                        },
                      })
                    );
                  }
                  setTabs(0);
                }}
              >
                Open
              </div>
              <div
                className={`${style.tab} ${tabs === 1 && style.tabActive}`}
                onClick={() => {
                  if (tabs !== 1) {
                    setLoading(true);
                    dispatch(
                      getTickets({
                        status: "close",
                        afterLoad: () => {
                          setLoading(false);
                        },
                      })
                    );
                  }
                  setTabs(1);
                }}
              >
                Closed
              </div>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            {tabs === 0 && (
              <div>
                {isFull(tickets) && tickets?.[0]?.status === "open" ? (
                  tickets.map((ticket) => {
                    return (
                      <SupportItem
                        key={ticket.id}
                        text={ticket?.ticketDetails}
                        date={formatDateTransactions(ticket?.updatedAt)}
                        isClosed={false}
                        categoryText={ticket?.topic}
                        isRead={!ticket?.unreadMessage}
                        onClickDelete={onClickTicketClose(ticket?.id)}
                      />
                    );
                  })
                ) : (
                  <EmptyList
                    loading={loading}
                    onClick={() => {
                      setModal(true);
                    }}
                    textButton={"Create ticket"}
                    icon={<SvgEmptyTickets />}
                    noBorder={true}
                  >
                    You don't have any open tickets
                  </EmptyList>
                )}
              </div>
            )}
            {tabs === 1 && !loading && (
              <div>
                {isFull(tickets) && tickets?.[0]?.status === "close" ? (
                  tickets.map((ticket) => {
                    return (
                      <SupportItem
                        key={ticket.id}
                        text={ticket?.ticketDetails}
                        date={formatDateTransactions(ticket?.updatedAt)}
                        isClosed={true}
                        categoryText={ticket?.topic}
                        isRead={!ticket?.unreadMessage}
                        onClickDelete={onClickTicketDelete(ticket?.id)}
                      />
                    );
                  })
                ) : (
                  <EmptyList
                    onClick={() => {}}
                    noButton={true}
                    textButton={"Create ticket"}
                    icon={<SvgEmptyTickets />}
                    noBorder={true}
                  >
                    You don't have any closed tickets
                  </EmptyList>
                )}
              </div>
            )}
            <CreateTicketModal
              onUploadFiles={onUploadFilesLocal}
              onDeleteUploadFile={onDeleteFileLocal}
              files={files}
              email={emailProps.email || ""}
              emailVerified={!!emailProps.emailVerified}
              visible={modal}
              topics={topics}
              onClose={() => setModal(false)}
              onCreateTicket={onCreateTicket}
            />

            <DeleteModal
              visible={modalClose}
              onClose={() => {
                setModalClose(false);
              }}
              onSubmit={onCloseTicket(currentTicket)}
              title={"Close ticket"}
              text={`Are you sure you want to close ticket?`}
              textBtnDelete={"Close"}
            />
            <DeleteModal
              visible={modalDelete}
              onClose={() => {
                setModalDelete(false);
              }}
              onSubmit={onDeleteTicket(currentTicket)}
              title={"Delete ticket"}
              text={`Are you sure you want to delete ticket?`}
              textBtnDelete={"Delete"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SupportPage;
