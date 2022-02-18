import React from "react";

//include images into your bundle
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useEffect } from "react";

const Home = () => {
	const [text, setText] = useState("");
	const [arr, setArr] = useState([]);

	const saveText = (e) => {
		setText(e.target.value);
	};

	// clicando enter tambien introducimos el dato en el array
	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			myfunction();
		}
	};

	const myfunction = () => {
		setArr([...arr, { label: text, done: false }]);

		let arrFetch = [...arr, { label: text, done: false }];

		setText("");

		//llamamos a la funcion para que envie a fetch
		sendFetch(arrFetch);
	};

	const deleteToDo = (value) => {
		setArr(arr.filter((v) => v !== value));

		//llamamos a la funcion para que borre el valor
		let deleteValueToFetch = arr.filter((v) => v.label !== value.label);

		sendFetch(deleteValueToFetch);
	};

	const sendFetch = (arr) => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/josemt90", {
			method: "PUT",
			body: JSON.stringify(arr),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((resp) => {
				console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
				console.log(resp.status); // el código de estado = 200 o código = 400 etc.
				console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
				return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
			})
			.then((data) => {
				//Aquí es donde debe comenzar tu código después de que finalice la búsqueda
				console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
			})
			.catch((error) => {
				//manejo de errores
				console.log(error);
			});
	};

	return (
		<div className="myDiv text-center">
			<div className="input-group">
				<input
					type="text"
					className="form-control"
					placeholder="Add To Do"
					onChange={saveText}
					onKeyDown={handleKeyDown}
					value={text}
				/>
				<button
					className="input-group-text btn btn-success"
					id="basic-addon2"
					onClick={myfunction}>
					Add
				</button>
			</div>

			<ul>
				{arr.map((value, index) => {
					return (
						<li
							className="d-flex justify-content-between"
							key={index}>
							{value.label}
							<FontAwesomeIcon
								className=" icon text-danger"
								icon={faX}
								onClick={() => {
									deleteToDo(value);
								}}
							/>
						</li>
					);
				})}
			</ul>
			<div className=" divCount text-center bg-white rounded-1">
				<p className=" text-secondary d-flex justify-content-start mx-1">
					{arr.length} item left
				</p>
			</div>

			<div className="mt-2">
				<button
					className="btn btn-danger"
					onClick={() => {
						fetch(
							"https://assets.breatheco.de/apis/fake/todos/user/josemt90",
							{
								method: "DELETE", // BORRARA HASTA EL USERNAME PERO NO PODEMOS HACER NADA PORQUE ES COSA DE LA API
								headers: {
									"Content-Type": "application/json",
								},
							}
						)
							.then((resp) => {
								console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
								console.log(resp.status); // el código de estado = 200 o código = 400 etc.
								console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
								return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
							})
							.then((data) => {
								//Aquí es donde debe comenzar tu código después de que finalice la búsqueda
								console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
							})
							.catch((error) => {
								//manejo de errores
								console.log(error);
							});
					}}>
					{" "}
					Eliminar API
				</button>
			</div>
		</div>
	);
};

export default Home;
