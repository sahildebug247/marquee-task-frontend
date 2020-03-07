import React, {useEffect, useState} from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Axios from 'axios';
import {withRouter} from 'react-router-dom';
import API_URL from "../../constants/api-url.constants";
function CompanyPage({history}) {
    const [companyList, setCompanyList] = useState([]);
    useEffect(() => {
        Axios.get(`${API_URL.GET_SAVED_COMPANY}`).then(({data}) => {
            setCompanyList([...data]);
        }).catch(e => {
            alert(`Saved companies could not be fetched: ${e.response.data.message}`)
            history.push('/')
        })
    }, []);
    return (
        <TableContainer>
            <Table stickyHeader={true}>
                <TableHead>
                    <TableRow>
                        <TableCell>

                            Company Name
                        </TableCell>
                        <TableCell>Company Id</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        companyList.map(({companyName, companyId}) => {
                            return (
                                <TableRow>
                                    <TableCell>{companyName}</TableCell>
                                    <TableCell>{companyId}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}
export default withRouter(CompanyPage);
