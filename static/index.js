const form = document.getElementById("giftForm");
const giftsContainer = document.getElementById("gifts");

async function loadGifts() {
	const response = await fetch("/gifts");
	const gifts = await response.json();

	giftsContainer.innerHTML = "";
	gifts.forEach((gift) => {
		const item = document.createElement("div");
		item.className = "giftItem";
		const header = document.createElement("h2");
		header.textContent = gift.name;
		const giftText = document.createElement("p");
		giftText.textContent = `The gift they're getting: "${gift.gift}". Wooooow sooo cool!!`;
		item.appendChild(header);
		item.appendChild(giftText);
		giftsContainer.appendChild(item);
	});
}

form.addEventListener("submit", async (event) => {
	event.preventDefault();

	const name = form.elements.name.value;
	const gift = form.elements.gift.value;

	await fetch("/gifts", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name, gift }),
	});

	form.reset();
	await loadGifts();
});

loadGifts();
