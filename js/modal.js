const modalTitle = modal.querySelector(".modal-ttl");
const modalMessage = modal.querySelector(".modal-msg");

export const showModalText = ok => {
	if (ok) {
		modal.classList.remove("fail");
		modalTitle.textContent = modalTextOptions.onSuccess.ttl;
		modalMessage.textContent = modalTextOptions.onSuccess.msg;
	} else {
		modal.classList.add("fail");
		if (navigator.onLine) {
			modalTitle.textContent = modalTextOptions.onFail.general.ttl;
			modalMessage.textContent = modalTextOptions.onFail.general.msg;
		} else {
			modalTitle.textContent = modalTextOptions.onFail.offline.ttl;
			modalMessage.textContent = modalTextOptions.onFail.offline.msg;
		}
	}
};

const modalTextOptions = {
	onSuccess: {
		ttl: modalTitle.textContent,
		msg: modalMessage.textContent,
	},
	onFail: {
		general: {
			ttl: "Что-то пошло не так!",
			msg: "Ваше сообщение не отправлено, пожалуйста, попробуйте позже.",
		},
		offline: {
			ttl: "Вы оффлайн!",
			msg: "Ваше сообщение не отправлено, нет соединения с интернетом.",
		},
	},
};

const closeOnBackDropClick = ({ currentTarget, target }) =>
	target === currentTarget && currentTarget.close();

modal.addEventListener("click", closeOnBackDropClick);
