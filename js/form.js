import { getFormData } from "./helpers.js";
import JustValidate from "just-validate";
import IMask from "imask";
import TomSelect from "tom-select";
import "tom-select/dist/css/tom-select.css";
import "../css/components/form/select.css";
import { showModalText } from "./modal.js";

const form = document.querySelector("#form-send-request");
const submitButton = document.querySelector("#submit-form");
const tomSelect = new TomSelect("#form-select", { create: false });

const toggleLoader = (loader = document.querySelector(".loader")) =>
	loader.classList.toggle("d-none");
const disableSubmitButton = () =>
	submitButton && (submitButton.disabled = true);
const enableSubmitButton = () =>
	submitButton && (submitButton.disabled = false);

const handleFormSubmit = async e => {
	const form = e.target;
	const clearForm = () => {
		tomSelect.clear();
		validator.refresh();
		form.reset();
	};

	e.preventDefault();
	disableSubmitButton();

	try {
		toggleLoader();
		const response = await fetch("https://httpbin.org/post", {
			method: "post",
			body: JSON.stringify(getFormData(new FormData(form))),
		});
		const result = await response.json();
		showModalText(response.ok);
		console.log(
			"%cФорма успешно отправилась на тестовый сервер. Он ответил:",
			"background: #222; color: chartreuse;",
			result
		);
	} catch {
		showModalText();
		throw new Error("Соединение с сервером не установлено!");
	} finally {
		toggleLoader();
		clearForm();
		enableSubmitButton();
		modal.showModal();
	}
};

IMask(form.querySelector("#phone"), { mask: "+{7} (000) 000‒00‒00" });

const validator = new JustValidate(form, {
	// successFieldCssClass: ["success-field"],
	errorFieldCssClass: ["error-field"],
	successLabelCssClass: ["labels", "success-label", "ellipsis"],
	errorLabelCssClass: ["labels", "error-label", "ellipsis"],
	validateBeforeSubmitting: true,
});

validator
	.onSuccess(handleFormSubmit)
	.addField(
		"#first-name",
		[
			{ rule: "required", errorMessage: "Укажите имя!" },
			{ rule: "maxLength", value: 15, errorMessage: "Слишком длинное имя!" },
			{ rule: "minLength", value: 2, errorMessage: "Слишком короткое имя!" },
			{
				rule: "customRegexp",
				value: /^[a-zA-Zа-яА-ЯЁё \-]+$/gi,
				errorMessage: "Неподходящее имя!",
			},
		],
		{ successMessage: "Отлично!" }
	)
	.addField(
		"#last-name",
		[
			{ rule: "required", errorMessage: "Укажите фамилию!" },
			{
				rule: "maxLength",
				value: 25,
				errorMessage: "Слишком длинная фамилия!",
			},
			{
				rule: "minLength",
				value: 2,
				errorMessage: "Слишком короткая фамилия!",
			},
			{
				rule: "customRegexp",
				value: /^[a-zA-Zа-яА-ЯЁё \-]+$/gi,
				errorMessage: "Неподходящая фамилия!",
			},
		],
		{ successMessage: "Отлично!" }
	)
	.addField(
		"#job-title",
		[
			{ rule: "required", errorMessage: "Укажите должность!" },
			{
				rule: "maxLength",
				value: 50,
				errorMessage: "Слишком длинная должность!",
			},
			{
				rule: "minLength",
				value: 3,
				errorMessage: "Слишком короткая должность!",
			},
		],
		{ successMessage: "Отлично!" }
	)
	.addField(
		"#company",
		[
			{ rule: "required", errorMessage: "Укажите компанию!" },
			{
				rule: "maxLength",
				value: 100,
				errorMessage: "Слишком длинное название!",
			},
			{
				rule: "minLength",
				value: 5,
				errorMessage: "Слишком короткое название!",
			},
		],
		{ successMessage: "Отличная компания!" }
	)
	.addField(
		"#email",
		[
			{ rule: "required", errorMessage: "Укажите email!" },
			{ rule: "email", errorMessage: "Неправильный email!" },
			{
				rule: "customRegexp",
				// value: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gi,
				value:
					/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi,
				errorMessage: "Неправильный email!",
			},
			{ rule: "maxLength", value: 50, errorMessage: "Слишком длинный email" },
			{ rule: "minLength", value: 5, errorMessage: "Слишком короткий email!" },
		],
		{ successMessage: "Отличный email!" }
	)
	.addField(
		"#phone",
		[
			{ rule: "required", errorMessage: "Укажите телефон!" },
			{ rule: "minLength", value: 18, errorMessage: "Слишком короткий номер!" },
		],
		{ successMessage: "Отличный номер!" }
	)
	.addField(
		"#subscription",
		[{ rule: "required", errorMessage: "Подпишитесь на рассылку!" }],
		{ successMessage: "Отлично!" }
	)
	.addField(
		"#privacy-policy",
		[{ rule: "required", errorMessage: "Необходимо принять условия!" }],
		{ successMessage: "Отлично!" }
	)
	.addRequiredGroup("#radio-group", "Выберите один из вариантов!", {
		errorsContainer: document.querySelector("#radio-group"),
	})
	.addField(
		"#comment",
		[{ rule: "required", errorMessage: "Нам важно ваше мнение!" }],
		{ successMessage: "Спасибо, что поделились своим мнением!" }
	)
	.addField(
		"#form-select",
		[{ rule: "required", errorMessage: "Выберите один из вариантов!" }],
		{ errorsContainer: document.querySelector(".select-wrapper") },
		{ successMessage: "Отлично!" }
	);
