'use strict';

const form = document.getElementById('form');
const inputs = document.querySelectorAll('#form input');

const regular = {
	name: /^[a-zA-ZÀ-ÿ\s]{0,15}$/,
	lastName: /^[a-zA-ZÀ-ÿ\s]{0,15}$/,
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
};

const boolean = {
	Name: false,
	LastName: false,
	Email: false,
	Date: false
};

const calculateAge = (dateBirth) => {
	const currentDate = new Date();
	const currentYear = parseInt(currentDate.getFullYear());
	const currentMonth = parseInt(currentDate.getMonth()) + 1;
	const currentDay = parseInt(currentDate.getDate());

	const birthYear = parseInt(String(dateBirth).substring(0, 4));
	const birthMonth = parseInt(String(dateBirth).substring(5, 7));
	const bithDay = parseInt(String(dateBirth).substring(8, 10));

	let age = currentYear - birthYear;
	if (currentMonth < birthMonth) {
		age--;
	} else if (currentMonth === birthMonth) {
		if (currentDay < bithDay) {
			age--;
		}
	}
	boolean.Date = true;
	if (age > 0 && age < 100) {
		return age;
	} else {
		return 'Ingrese una fecha valida';
	}
};

const condition = (regul, input, val) => {
	if (regul.test(input.value)) {
		document
			.querySelector(`#form .form__inputError${val}`)
			.classList.remove(`form__inputError${val}On`);
		boolean[val] = true;
	} else {
		document
			.querySelector(`#form .form__inputError${val}`)
			.classList.add(`form__inputError${val}On`);
		boolean[val] = false;
	}
};

const validateForm = (event) => {
	switch (event.target.id) {
		case 'name':
			condition(regular.name, event.target, 'Name');
			break;
		case 'lastName':
			condition(regular.lastName, event.target, 'LastName');
			break;
		case 'email':
			condition(regular.email, event.target, 'Email');
			break;
		case 'dateBirth':
			window.addEventListener('load', () => {
				form.addEventListener('change', () => {
					if (event.target) {
						age.placeholder = calculateAge(event.target);
					}
				});
			});
			break;
	}
};

const disabledAge = () => {
	return true;
};

inputs.forEach((input) => {
	input.addEventListener('keyup', validateForm);
	input.addEventListener('blur', validateForm);
});

form.addEventListener('submit', (event) => {
	if (boolean.Name && boolean.LastName && boolean.Email && boolean.Date) {
		form.reset();
		alert('datos enviados correctamente');
	} else {
		event.preventDefault();
	}
});

window.addEventListener('load', function () {
	form.addEventListener('change', function () {
		if (form.dateBirth.value) {
			age.placeholder = calculateAge(form.dateBirth.value);
		}
	});
});
