import React, {useEffect, useState} from "react";
import Axios from 'axios';
import API_URL from "../../constants/api-url.constants";
import {withRouter} from 'react-router-dom';
import {useDebounce} from 'use-debounce';
import './homepage.styles.scss'
function HomePage({history}) {
    const [companyList, setCompanyList] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [selectedInput, setSelectedInput] = useState({});
    const [debouncedSearchValue] = useDebounce(searchInput, 500);
    useEffect(() => {
        if (debouncedSearchValue.length === 0) {
            setCompanyList([]);
        }else {
            Axios.get(`${API_URL.GET_COMPANY_LIST}?search=${debouncedSearchValue}`)
                .then(({data}) => {
                    setCompanyList([...data]);
                })
                .catch(e => {
                    console.log(`Company List could not be fetched, ${e.response.data.message}`)
                })
        }
    }, [debouncedSearchValue]);
    const handleChange = (e) => {
        const value = e.target.value;
        setSearchInput(value);
    };
    const handleSelect = (companyName, companyId) => {
        setSelectedInput({
            companyName,
            companyId
        });
        setSearchInput(companyName);
    };
    const handleSubmit = () => {
        if (Object.keys(selectedInput).length === 0) {
            alert('Please select a valid company first');
        } else {
            Axios.post(API_URL.REGISTER_COMPANY, selectedInput)
                .then(({data}) => {
                    history.push('/company')
                })
                .catch(e => {
                    alert(`Company could not be saved: ${e.response.data.message}`);
                    console.log(e.response)
                })
        }
    };
    return(
            <div className={'homepage-container'}>
                <div className={'title'}>
                    Start Typing to get the company names
                </div>
                <input type={'text'} value={searchInput} onChange={handleChange}/>
                <button onClick={handleSubmit}>Submit</button>
                {companyList.map((company) => {
                    return (
                        <div onClick={() => handleSelect(company.companyName, company.companyId)} key={company.companyId}>{company.companyName}</div>
                    );
                })}
            </div>
    )
}
export default withRouter(HomePage);
