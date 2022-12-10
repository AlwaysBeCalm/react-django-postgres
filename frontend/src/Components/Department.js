import React, {Component} from 'react';
import {api_endpoints} from "../ApiEndpoints";


export class Department extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departments: [],
            modalTitle: "",
            Name: "",
            Id: 0,
        }
    }

    updateName = (e) => {
        this.setState({Name: e.target.value})
    }

    showModal(obj, title) {
        this.setState({
                modalTitle: title,
                Id: obj.Id,
                Name: obj.Name
            }
        )
    }

    addDepartment() {
        fetch(api_endpoints.API_URL + "/departments", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                        Name: this.state.Name
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

    updateDepartment() {
        fetch(api_endpoints.API_URL + "/departments", {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                        Id: this.state.Id,
                        Name: this.state.Name
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

    deleteDepartment(Id) {
        if (window.confirm("Are you sure?")) {
            fetch(api_endpoints.API_URL + "/departments/" + Id, {
                    method: "DELETE",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                body: JSON.stringify("")
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
    }

    componentDidMount() {
        this.refreshList()
    }


    render() {
        const {
            departments,
            modalTitle,
            Name,
            Id
        } = this.state;

        return (
            <div>
                <button type="button" className="btn btn-primary m-2 float-end"
                        data-bs-toggle="modal" data-bs-target="#exampleModal"
                        onClick={() => this.showModal({
                            Id: 0,
                            Name: ""
                        }, "Add Department")}>
                    Add Department
                </button>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Options</th>
                    </tr>
                    </thead>
                    <tbody>
                    {departments.map(department =>
                        <tr key={department.Id}>
                            <td>{department.Id}</td>
                            <td>{department.Name}</td>
                            <td>
                                <button type="button" className="btn btn-primary mr-1"
                                        data-bs-toggle="modal" data-bs-target="#exampleModal"
                                        onClick={() => this.showModal(department, "Edit Department")}>
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button type="button" className="btn btn-danger mr-1"
                                        onClick={() => this.deleteDepartment(department.Id)}>
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
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Department Name:</span>
                                    <input type="text" className="form-control"
                                           value={Name}
                                           onChange={this.updateName}
                                    />
                                </div>

                                {Id === 0 ?
                                    <button type="button" className="btn btn-primary float-start"
                                            onClick={() => this.addDepartment()}>
                                        Create
                                    </button>
                                    :
                                    null
                                }
                                {Id !== 0 ?
                                    <button type="button" className="btn btn-primary float-start"
                                            onClick={() => this.updateDepartment()}>
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
        );
    }
}
