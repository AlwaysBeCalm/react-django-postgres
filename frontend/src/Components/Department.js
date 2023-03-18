import React, {Component} from 'react';
import {api_endpoints} from "../ApiEndpoints";
import axios from 'axios';

// we need to use axios for the api calls

export class Department extends Component {
	URL = `${api_endpoints.API_URL}/departments`

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
		axios.post(this.URL, {
			Name: this.state.Name
		}).then((data) => {
			alert(data.data)
			this.refreshList()
			document.getElementsByClassName("btn-close")[0].click()
		}).catch((error) => {
			alert(error)
		})
	}

	updateDepartment() {
		axios.put(this.URL, {
				Id: this.state.Id,
				Name: this.state.Name
			}
		).then(data => {
				alert(data.data)
				this.refreshList()
				document.getElementsByClassName("btn-close")[0].click()
			}, (error) => {
				alert(error)
			}
		)
	}

	deleteDepartment(Id) {
		if (window.confirm("Are you sure?")) {
			axios.delete(`${this.URL}/${Id}`)
				.then(data => {
					alert(data)
					this.refreshList()
				})
				.catch(error => {
						alert(error)
					}
				)
		}
	}

	refreshList() {
		axios.get(this.URL)
			.then(response => {
					if (response.status === 200) {
						this.setState({departments: response.data})
					}
				}
			).catch(() => {
			this.setState({departments: []})
		})
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
						data-bs-toggle="modal" data-bs-target="#modal"
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
						<th colSpan={2}>Options</th>
					</tr>
					</thead>
					<tbody>
					{departments.map(department =>
						<tr key={department.Id}>
							<td>{department.Id}</td>
							<td>{department.Name}</td>
							<td>
								<button type="button" className="btn btn-primary mr-1"
										data-bs-toggle="modal" data-bs-target="#modal"
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
				<Modal
					modalTitle={modalTitle}
					Name={Name}
					Id={Id}
					updateName={this.updateName}
					addDepartment={this.addDepartment.bind((this))}
					updateDepartment={this.updateDepartment.bind(this)}
				/>
			</div>
		);
	}
}

const Modal = (props) => {
	return (
		<div className="modal fade" id="modal" tabIndex="-1" aria-hidden="true">
			<div className="modal-dialog modal-lg modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">{props.modalTitle}</h5>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
						</button>
					</div>

					<div className="modal-body">
						<div className="input-group mb-3">
							<span className="input-group-text">Department Name:</span>
							<input type="text" className="form-control"
								   value={props.Name}
								   onChange={props.updateName}
							/>
						</div>

						{props.Id === 0 ?
							<button type="button" className="btn btn-primary float-start"
									onClick={() => props.addDepartment()}>
								Create
							</button>
							:
							null
						}
						{props.Id !== 0 ?
							<button type="button" className="btn btn-primary float-start"
									onClick={() => props.updateDepartment()}>
								Update
							</button>
							:
							null
						}
					</div>
				</div>
			</div>
		</div>
	)
}
