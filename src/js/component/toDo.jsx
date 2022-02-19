import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

//include images into your bundle

//create your first component
const ToDo = () => {
	const [task, setTask] = useState("");
	const [list, setList] = useState([]);

	useEffect(() => {
		uploadTask(); // cuando se cargue el componente obtendra las tareas de la api
	}, []);

	useEffect(() => {
		addTask(); // se introducira nuevos valores a la api cada vez que se actualice la lista
	}, [list]);

	const uploadInput = (event) => {
		setTask(event.target.value); //obtenemos el valor del input
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			// al presionar enter tambien introducira las nuevas tareas que se pasen por el input a la lista
			sendInput();
		}
	};

	const deleteTask = (index) => {
		console.log(index);
		let newList = list.filter((task, indice) => index !== indice); // cuando no encuentre el index devolvera un array sin ese valor

		setList(newList);
	};

	const sendInput = (event) => {
		const newTask = {
			// se crea este objeto porque es el formato que lee la api
			label: task,
			done: false,
		};
		setList([...list, newTask]); // introducira las nuevas tareas que se pasen por el input a la lista
	};

	const uploadTask = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/josemt90", {
			method: "GET",
		})
			.then((res) => res.json())
			.then((data) => setList(data)); // devolvera los valores que hay en la api y los introducira en la lista
	};

	const addTask = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/josemt90", {
			method: "PUT",
			body: JSON.stringify(list), //introducira en la api los valores de la lista
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json()) // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
			.catch((error) => {
				//manejo de errores
				console.log(error);
			});

		setTask("");
	};

	return (
		<div className="myDiv text-center">
			<div className="input-group">
				<input
					type="text"
					className="form-control"
					placeholder="Add To Do"
					onChange={uploadInput}
					onKeyDown={handleKeyDown}
					value={task}
				/>
				<button
					className="input-group-text btn btn-success"
					id="basic-addon2"
					onClick={sendInput}>
					Add
				</button>
			</div>

			<ul>
				{list.map((item, index) => {
					return (
						<li
							className="d-flex justify-content-between"
							key={index}>
							{item.label}
							<FontAwesomeIcon
								className=" icon text-danger"
								icon={faX}
								onClick={() => {
									deleteTask(index);
								}}
							/>
						</li>
					);
				})}
			</ul>
			<div className=" divCount text-center bg-white rounded-1">
				<p className=" text-secondary d-flex justify-content-start mx-1">
					{list.length} item left
				</p>
			</div>
		</div>
	);
};

export default ToDo;
