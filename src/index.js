import React, { useState, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import {
	CSSTransition,
	TransitionGroup,
} from 'react-transition-group';
import uuid from 'uuid';
import './styles.css';
import 'spectre.css/dist/spectre.min.css'
import 'spectre.css/dist/spectre-icons.min.css'

const TodoItem = ({id, text, removeItem}) => (

		<div className="col-12 mb-1">
			<div className="toast toast-primary">
				<button className="btn btn-clear float-right" onClick={() => {
					removeItem(id)
				}} />
				{text}
			</div>
		</div>
);

const TodoList = () => {
	const [value, setValue] = useState('')
	const [items, setItems] = useState(() => [
		{
			id: uuid(),
			text: 'Buy eggs',
		},
		{
			id: uuid(),
			text: 'Pay bills',
		},
		{
			id: uuid(),
			text: 'Invite friends over',
		},
		{
			id: uuid(),
			text: 'Fix the TV',
		},
	]);

	const addItem = (text = '') => {
		if (!text) {
			return
		}
		setItems([...items, {
			id: uuid(),
			text,
		}])
	}

	const removeItem = (id) => {
		const newItems  = items.filter((item) => item.id !== id)
		setItems([...newItems])
	}


	return (
		<div className="m-2">
			<div className="container mb-2">
				<div className="columns">
					<div className="form-group column">
						<input type="text" value={value} onChange={e => setValue(e.target.value)} className="form-input" placeholder="Add new item"/>
					</div>
					<div className="column">
						<button className="btn btn-primary" onClick={() => {
							addItem(value)
							setValue('')
						}}>Add new</button>
					</div>
				</div>
			</div>
			<div className="container">
				<TransitionGroup className="todo-list columns">

					{items.map(({ id, text }) => (
						<CSSTransition
							key={id}
							timeout={500}
							classNames="item"
						>
							<TodoItem text={text} removeItem={removeItem} id={id} />
						</CSSTransition>
					))}
				</TransitionGroup>
			</div>
		</div>
	);
}


const container = document.getElementById('root');
const root = createRoot(container);
root.render(<StrictMode><TodoList /></StrictMode>);
