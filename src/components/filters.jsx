import  {useFilterContext} from "../provider/FilterProvider"
 function Filter(props)
 {
    const {setCountry,setCategory,fromDate,setFromDate,setToDate,toDate} = useFilterContext()
    const countries = props.countries
    const categories = props.categories

    function onChangeCountry(event){
        setCountry(countries[event.target.value]);
    }

    function onChangeCategory(event){
        setCategory(event.target.value)
    }

    function fromDateHandler(event){
        setFromDate(event.target.value)
    }

    function ToDateHandler(event){
        setToDate(event.target.value)
    }

    return (
    <div className="setRow">
        <div className='container'>
          <select className='selectInput' onChange={onChangeCountry}>
            {Object.keys(countries).map((el) => (
              <option key={countries[el]}>{el}</option>
            ))}
          </select>
    
          <select className='selectInput' onChange={onChangeCategory}>
            {categories.map((el) => {
              const uniqueKey = el
                .trim()
                .split('')
                .map((char) => char.charCodeAt(0))
                .reduce((acc, curr) => acc + curr, 0);
              return <option key={uniqueKey}>{el}</option>;
            })}
          </select>
        </div>
        <div className="date-container">
          <label htmlFor="from" className='label'>
            Period : yyyy-mm-dd
          </label>
          <input id="from" type="text" placeholder="beginning of the period" value={fromDate} onChange={fromDateHandler} className="inputPeriod" />
          <input id="to" type="text" placeholder="end of period" value={toDate} onChange={ToDateHandler} className="inputPeriod" />
        </div>
    </div>
      );

}

export default Filter