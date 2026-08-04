export const modal = document.querySelector("#modal");
const modalTitle = modal?.querySelector(".modal-ttl");
const modalMessage = modal?.querySelector(".modal-msg");

const modalTextOptions = {
	onSuccess: {
		ttl: modalTitle?.textContent || "Успешно!",
		msg: modalMessage?.textContent || "Ваша заявка принята.",
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

export const showModalText = ok => {
	if (!modal || !modalTitle || !modalMessage) return;

	if (ok) {
		modal.classList.remove("fail");
		modalTitle.textContent = modalTextOptions.onSuccess.ttl;
		modalMessage.textContent = modalTextOptions.onSuccess.msg;
	} else {
		modal.classList.add("fail");
		const type = navigator.onLine ? "general" : "offline";
		modalTitle.textContent = modalTextOptions.onFail[type].ttl;
		modalMessage.textContent = modalTextOptions.onFail[type].msg;
	}
};

const closeOnBackDropClick = ({ currentTarget, target }) =>
	target === currentTarget && currentTarget.close();

modal?.addEventListener("click", closeOnBackDropClick);
