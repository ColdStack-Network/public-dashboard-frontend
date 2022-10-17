//@ts-nocheck
import React from 'react';
import moment from 'moment';
import Helmet from 'react-helmet';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import {formatDate, parseDate} from 'react-day-picker/moment';
import style from "./dayPickerRange.module.scss";


class DayPickerRange extends React.Component {
  constructor(props) {
    super(props);
    /*this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.state={
      from : props.from,
      to: props.to
    }*/
  }


  /*handleFromChange(from) {
    // Change the from date and focus the "to" input field
    this.setState({ from });
    console.log("handleFromChange",  from);
    this.props.onFromChange(from);
  }*/

  /*handleToChange(to) {
    this.setState({ to }, this.showFromMonth);
    console.log("handleToChange",  to);
    this.props.onToChange(to);
  }*/

  render() {
    const {from, to, handleFromChange, handleToChange} = this.props;
    const modifiers = {start: from, end: to};
    console.log("this.props.innerRef", this.props.innerRef, this.props.innerRef?.daypicker);

    const modifiersStyles = {
      birthday: {
        color: 'white',
        backgroundColor: '#ffc107',
      },
      thursdays: {
        color: '#ffc107',
        backgroundColor: '#fffdee',
      },
    };

    return (
      <div className="InputFromTo">
        <div className={`InputFromTo-from ${this.props.classNameFrom}`}>
          <div className="labelInput">From:</div>
          <DayPickerInput
            modifiersStyles={modifiersStyles}
            value={from}
            placeholder=""
            format="YYYY-MM-DD"
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
              selectedDays: [from, {from, to}],
              disabledDays: {after: to},
              toMonth: to,
              modifiers,
              numberOfMonths: 1,
              onDayClick: () => this.props.innerRef.current.getInput().focus(),
              //onDayClick: () => this.to.getInput().focus(),
            }}
            onDayChange={handleFromChange}
          />
        </div>

        <div className={`InputFromTo-to ${this.props.classNameTo}`}>
          <div className="labelInput">To:</div>
          <DayPickerInput
            ref={this.props.innerRef}
            value={to}
            placeholder=""
            format="YYYY-MM-DD"
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
              selectedDays: [from, {from, to}],
              disabledDays: {before: from},
              modifiers,
              month: from,
              fromMonth: from,
              numberOfMonths: 1,
            }}
            onDayChange={handleToChange}
          />
        </div>
        <Helmet>
          <style>{`
          
          
    .InputFromTo-to input, .InputFromTo-from input{
        width: 180px;
        outline: none;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        text-align: center;
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        height: 48px;
        padding: 0 24px;
        color: #333333;
        border: 1px solid #D9E1FF;
        border-radius: 5px;
        transition: all 0.2s linear;
     }     
     
    .DayPicker-Day {
       border-radius: 5px !important;
     }
          
    .labelInput{
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 24px;
    color: #5A5D65;
    margin-bottom: 8px;

    }      
          
   .InputFromTo{
      display: flex;
   }
   .InputFromTo-from{
    margin-right: 16px 
   }
    
   .DayPicker-Months {
     flex-wrap: nowrap!important;
   }     
          
  .InputFromTo .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #f0f8ff !important;
    color: #5A5D65;
  }
  .InputFromTo .DayPicker-Day {
    border-radius: 0 !important;
  }
  .InputFromTo .DayPicker-Day--start {
    background-color: #1FCF90 !important;
    border-top-left-radius: 5px !important;
    border-bottom-left-radius: 5px !important;
  }
  
  .InputFromTo .DayPicker-Day--start:hover {
    background-color: #28AB7C !important;
  }
  
  .InputFromTo .DayPicker-Day--end { 
    background-color: #1FCF90 !important;
    border-top-right-radius: 5px !important;
    border-bottom-right-radius: 5px !important;
  }
  
  .InputFromTo .DayPicker-Day--end:hover {
    background-color: #28AB7C !important;
  }
  
  .DayPicker-Day--today {
    color: #0053F1;
    font-weight: 500;
  }
  
  .InputFromTo .DayPickerInput-Overlay {
    width: 280px;
  }
  .InputFromTo-to .DayPickerInput-Overlay {
    margin-left: 0px;
  }
`}</style>
        </Helmet>
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => <DayPickerRange
  innerRef={ref} {...props}
/>);
// _________________________________________________________________________________________________________________________________________________________
/*const DayPickerRange = (props) => {
  const {from, to, handleFromChange, handleToChange } = props;

  console.log("from, to!", from, to);

  const refInput = useRef(null);
  /!*constructor(props) {
    super(props);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.state={
      from : props.from,
      to: props.to
    }
  }*!/

  const showFromMonth = useCallback(()=> {
    //const { from, to } = this.state;
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), 'months') < 2) {
      //refInput.current.getDayPicker().showMonth(from);
      console.log("refInput.current", refInput.current);
    }
  }, [from,to, refInput])

  console.log("refInput.current!!", refInput?.current);
  const str = JSON.stringify(refInput?.current, getCircularReplacer());
  console.log("str==", str.indexOf("getInput"), str.indexOf("getDayPicker"));

  /!* handleFromChange(from) {
     // Change the from date and focus the "to" input field
     this.setState({ from });
     console.log("handleFromChange",  from);
     this.props.onFromChange(from);
   }*!/

  useEffect(()=>{
    showFromMonth();
    }
  , [to, showFromMonth])
  /!*function handleToChange(to) {
    this.setState({ to }, this.showFromMonth);
    console.log("handleToChange",  to);
    this.props.onToChange(to);
  }*!/




    const modifiers = { start: from, end: to };
    return (
      <div className="InputFromTo">
        <div className={`InputFromTo-from ${props?.classNameFrom}`}>
          <div className="labelInput">From:</div>
          <DayPickerInput
            value={from}
            placeholder=""
            format="DD-MM-YYYY"
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
              selectedDays: [from, { from, to }],
              disabledDays: { after: to },
              toMonth: to,
              modifiers,
              numberOfMonths: 1,
              onDayClick: () => { console.log("onDayCLick"); refInput.current?.input?.focus()},
            }}
            onDayChange={handleFromChange}
          />
        </div>

        <div className={`InputFromTo-to ${props?.classNameTo}`}>
          <div className="labelInput">To:</div>
          <DayPickerInput
            /!*ref={el => (this.to = el)}*!/
            ref={refInput}
            value={to}
            placeholder=""
            format="DD-MM-YYYY"
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
              selectedDays: [from, { from, to }],
              disabledDays: { before: from },
              modifiers,
              month: from,
              fromMonth: from,
              numberOfMonths: 1,
            }}
            onDayChange={handleToChange}
          />
        </div>
        <Helmet>
          <style>{`


    .InputFromTo-to input, .InputFromTo-from input{
        width: 180px;
        outline: none;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        text-align: center;
        height: 48px;
        padding: 0 24px;
        color: #333333;
        border: 1px solid #D9E1FF;
        border-radius: 5px;
        transition: all 0.2s linear;
     }

    .labelInput{
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 24px;
    color: #5A5D65;
    margin-bottom: 8px;

    }

   .InputFromTo{
      display: flex;
   }
   .InputFromTo-from{
    margin-right: 16px
   }

   .DayPicker-Months {
     flex-wrap: nowrap!important;
   }

  .InputFromTo .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #f0f8ff !important;
    color: #4a90e2;
  }
  .InputFromTo .DayPicker-Day {
    border-radius: 0 !important;
  }
  .InputFromTo .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
  }
  .InputFromTo .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }
  .InputFromTo .DayPickerInput-Overlay {
    width: 280px;
  }
  .InputFromTo-to .DayPickerInput-Overlay {
    margin-left: 0px;
  }
`}</style>
        </Helmet>
      </div>
    );

}

export default DayPickerRange;*/

/*
import React from 'react';
import moment from 'moment';
import Helmet from 'react-helmet';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { formatDate, parseDate } from 'react-day-picker/moment';

export default class DayPickerRange extends React.Component {
  constructor(props) {
    super(props);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.state={
      from : props.from,
      to: props.to
    }
  }

  showFromMonth() {
    const { from, to } = this.state;
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), 'months') < 2) {
      this.to.getDayPicker().showMonth(from);
    }
  }

  handleFromChange(from) {
    // Change the from date and focus the "to" input field
    this.setState({ from });
    console.log("handleFromChange",  from);
    this.props.onFromChange(from);
  }

  handleToChange(to) {
    this.setState({ to }, this.showFromMonth);
    console.log("handleToChange",  to);
    this.props.onToChange(to);
  }


  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    return (
      <div className="InputFromTo">
        <div className={`InputFromTo-from ${this.props.classNameFrom}`}>
          <div className="labelInput">From:</div>
          <DayPickerInput
            value={from}
            placeholder=""
            format="DD-MM-YYYY"
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
              selectedDays: [from, { from, to }],
              disabledDays: { after: to },
              toMonth: to,
              modifiers,
              numberOfMonths: 1,
              onDayClick: () => this.to.getInput().focus(),
            }}
            onDayChange={this.handleFromChange}
          />
        </div>

        <div className={`InputFromTo-to ${this.props.classNameTo}`}>
          <div className="labelInput">To:</div>
          <DayPickerInput
            ref={el => (this.to = el)}
            value={to}
            placeholder=""
            format="DD-MM-YYYY"
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
              selectedDays: [from, { from, to }],
              disabledDays: { before: from },
              modifiers,
              month: from,
              fromMonth: from,
              numberOfMonths: 1,
            }}
            onDayChange={this.handleToChange}
          />
        </div>
        <Helmet>
          <style>{`


    .InputFromTo-to input, .InputFromTo-from input{
        width: 180px;
        outline: none;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        text-align: center;
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        height: 48px;
        padding: 0 24px;
        color: #333333;
        border: 1px solid #D9E1FF;
        border-radius: 5px;
        transition: all 0.2s linear;
     }

    .labelInput{
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 24px;
    color: #5A5D65;
    margin-bottom: 8px;

    }

   .InputFromTo{
      display: flex;
   }
   .InputFromTo-from{
    margin-right: 16px
   }

   .DayPicker-Months {
     flex-wrap: nowrap!important;
   }

  .InputFromTo .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #f0f8ff !important;
    color: #4a90e2;
  }
  .InputFromTo .DayPicker-Day {
    border-radius: 0 !important;
  }
  .InputFromTo .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
  }
  .InputFromTo .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }
  .InputFromTo .DayPickerInput-Overlay {
    width: 280px;
  }
  .InputFromTo-to .DayPickerInput-Overlay {
    margin-left: 0px;
  }
`}</style>
        </Helmet>
      </div>
    );
  }
}*/
