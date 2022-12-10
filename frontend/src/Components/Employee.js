import React, {Component} from 'react';
import {api_endpoints} from "../ApiEndpoints";


export class Employee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departments: [],
            employees: [],
            Id: 0,
            Name: "",
            Department: "",
            JoiningDate: "",
            modalTitle: ""
        }
    }

    updateName = (e) => {
        this.setState({Name: e.target.value})
    }
    updateDepartment = (e) => {
        this.setState({Department: e.target.value})
    }
    updateJoiningDate = (e) => {
        this.setState({JoiningDate: e.target.value})
    }

    showModal(obj, title) {
        this.setState({
                modalTitle: title,
                Id: obj.Id,
                Name: obj.Name,
                Department: obj.Department,
                JoiningDate: obj.JoiningDate,
            }
        )
        if (!obj.Department)
            this.setState({Department: document.getElementById('department').options[1].value})
    }

    addEmployee() {
        fetch(api_endpoints.API_URL + "/employees", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                        Name: this.state.Name,
                        Department: this.state.Department,
                        JoiningDate: this.state.JoiningDate,
                    }
                )
            }
        )
            .then(response => response.json())
            .then(data => {
                    alert(data)
                    this.refreshList()
                    document.getElementsByClassName("btn-close")[0].click()
                }, (error) => {
                    alert(error)
                }
            )
    }

    updateEmployee() {
        fetch(api_endpoints.API_URL + "/employees", {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                        Id: this.state.Id,
                        Name: this.state.Name,
                        Department: this.state.Department,
                        JoiningDate: this.state.JoiningDate,
                        Photo: this.state.Photo,
                    }
                )
            }
        )
            .then(response => response.json())
            .then(data => {
                    alert(data)
                    this.refreshList()
                    document.getElementsByClassName("btn-close")[0].click()
                }, (error) => {
                    alert(error)
                }
            )
    }

    deleteEmployee(Id) {
        if (window.confirm("Are you sure?")) {
            fetch(api_endpoints.API_URL + "/employees/" + Id, {
                    method: "DELETE",
                }
            )
                .then(response => response.json())
                .then(data => {
                        alert(data)
                        this.refreshList()
                    }, (error) => {
                        alert(error)
                    }
                )
        }
    }

    refreshList() {
        fetch(api_endpoints.API_URL + "/departments")
            .then(response => response.json())
            .then(data => {
                    this.setState({departments: data})
                }
            )

        fetch(api_endpoints.API_URL + "/employees")
            .then(response => response.json())
            .then(data => {
                    this.setState({employees: data})
                }
            )
    }

    componentDidMount() {
        this.refreshList()
    }


    render() {
        const {
            departments,
            employees,
            Id,
            Name,
            Department,
            JoiningDate,
            modalTitle
        } = this.state;

        return (
            <div>
                <button type="button" className="btn btn-primary m-2 float-end"
                        data-bs-toggle="modal" data-bs-target="#exampleModal"
                        onClick={() => this.showModal({
                            Id: 0,
                            Name: "",
                            Department: "",
                            JoiningDate: "",
                        }, "Add Employee")}>
                    Add Employee
                </button>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>JoiningDate</th>
                        <th>Options</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employees.map(employee =>
                        <tr key={employee.Id}>
                            <td>{employee.Id}</td>
                            <td>{employee.Name}</td>
                            <td>{employee.Department}</td>
                            <td>{employee.JoiningDate}</td>
                            <td>
                                <button type="button" className="btn btn-primary mr-1"
                                        data-bs-toggle="modal" data-bs-target="#exampleModal"
                                        onClick={() => this.showModal(employee, "Edit Employee")}>
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button type="button" className="btn btn-danger mr-1"
                                        onClick={() => this.deleteEmployee(employee.Id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                </button>
                            </div>

                            <div className="modal-body">
                                <div className="d-flex flex-row bd-highlight mb-3">
                                    <div className="p-2 w-50 bd-highlight">
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Employee Name:</span>
                                            <input type="text" className="form-control"
                                                   value={Name}
                                                   onChange={this.updateName}
                                            />
                                        </div>
                                    </div>
                                    <div className="p-2 w-50 bd-highlight">
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Employee Department:</span>
                                            <select className="form-select" id={"department"}
                                                    onChange={this.updateDepartment}
                                                    value={Department}>
                                                <option disabled={true}>select department</option>
                                                {departments.map(department =>
                                                <option key={department.Id}>
                                                    {department.Name}
                                                </option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="p-2 w-50 bd-highlight">
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Employee Joining Date:</span>
                                            <input type="date" className="form-control"
                                                   value={JoiningDate}
                                                   onChange={this.updateJoiningDate}
                                            />
                                        </div>
                                    </div>
                                    {Id === 0 ?
                                        <button type="button" className="btn btn-primary float-start"
                                                onClick={() => this.addEmployee()}>
                                            Create
                                        </button>
                                        :
                                        null
                                    }
                                    {Id !== 0 ?
                                        <button type="button" className="btn btn-primary float-start"
                                                onClick={() => this.updateEmployee()}>
                                            Update
                                        </button>
                                        :
                                        null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
