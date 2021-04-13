let user_list = document.querySelector('.user_list')
let u_orders = document.querySelector('.orders')
let user_name_input = document.querySelector('.user_name_input')
let user_phone_input = document.querySelector('.user_phone_input')
let add_member_btn = document.querySelector('#add_member_btn')
let food_name = document.querySelector('#food_name')
let food_count = document.querySelector('.food_count')
let add_order_btn = document.querySelector('#add_order_btn')


let users = window.localStorage.getItem('users')
if (!users) users = [{
		user_id: 1,
		user_name: "Sherzod",
		contact: "+998991234567"
	},
	{
		user_id: 2,
		user_name: "Abdulloh",
		contact: "+998991234567"
	},
	{
		user_id: 3,
		user_name: "Ne'matulloh",
		contact: "+998991234567"
	},
	{
		user_id: 4,
		user_name: "Sardor",
		contact: "+998991234567"
	},
	{
		user_id: 5,
		user_name: "Muhammad",
		contact: "+998991234567"
	},
	{
		user_id: 6,
		user_name: "Jamoliddin",
		contact: "+998991234567"
	}
]
else users = JSON.parse(users)

/*users = [{
		user_id: 1,
		user_name: "Sherzod",
		contact: "+998991234567"
	},
	{
		user_id: 2,
		user_name: "Abdulloh",
		contact: "+998991234567"
	},
	{
		user_id: 3,
		user_name: "Ne'matulloh",
		contact: "+998991234567"
	},
	{
		user_id: 4,
		user_name: "Sardor",
		contact: "+998991234567"
	},
	{
		user_id: 5,
		user_name: "Muhammad",
		contact: "+998991234567"
	},
	{
		user_id: 6,
		user_name: "Jamoliddin",
		contact: "+998991234567"
	}
]
*/

const orders = [{
		order_id: 1,
		user_id: 1,
		food_id: 1,
		count: 2
	},
	{
		order_id: 5,
		user_id: 2,
		food_id: 2,
		count: 2
	},
	{
		order_id: 8,
		user_id: 2,
		food_id: 2,
		count: 2
	},
	{
		order_id: 10,
		user_id: 3,
		food_id: 1,
		count: 2
	},
	{
		order_id: 11,
		user_id: 3,
		food_id: 2,
		count: 2
	},
	{
		order_id: 12,
		user_id: 3,
		food_id: 3,
		count: 1
	},

]

const foods = [{
		food_id: 1,
		food_name: "Lavash",
		food_photo: "./img/lavash.webp"
	},
	{
		food_id: 2,
		food_name: "Burger",
		food_photo: "./img/burger.jpeg"
	},
	{
		food_id: 3,
		food_name: "Cola",
		food_photo: "./img/cola-can.svg"
	}
]



function renderer(users) {
	for (let icon of users) {
		let li = document.createElement('li')
		let box = document.createElement('div')
		let par = document.createElement('p')
		let head = document.createElement('h4')
		let strong = document.createElement('strong')

		li.setAttribute('id', icon.user_id)
		par.classList.add('user_phone')
		head.classList.add('user_name')
		strong.classList.add('user_id')

		head.textContent = icon.user_name
		strong.textContent = icon.user_id
		par.textContent = icon.contact

		box.appendChild(head)
		box.appendChild(strong)
		li.appendChild(box)
		li.appendChild(par)
		user_list.prepend(li)
	}
}

renderer(users)

add_member_btn.addEventListener('click', function () {
	let y = {}
	let x = 0
	for (let i of users) {
		if (i.user_id >= x) {
			x = i.user_id
		}
	}
	y.user_id = x + 1
	y.user_name = user_name_input.value
	y.contact = user_phone_input.value
	users.push(y)
	window.localStorage.setItem('users', JSON.stringify(users))

	user_list.innerHTML = null
	renderer(users)

	user_name_input.value = null
	user_phone_input.value = null
})

let allLi = document.querySelectorAll('li')
let li = document.querySelector('li')
let name = document.querySelector('.name')
let idSpan = document.querySelector('.id')
let phone = document.querySelector('.phone')
let head = document.querySelector('.head')

function render_orders(){
	for (let i of allLi) {
		i.onclick = function () {
			u_orders.innerHTML = null
			/*
			user_list.innerHTML = null
			renderer(users)
			*/
			let nameFiltered
			let phoneFiltered
			for(let icon of users){
				if(icon.user_id === Number(i.id)){
					nameFiltered = icon.user_name
					phoneFiltered = icon.contact
				}
			}
			name.textContent = nameFiltered
			idSpan.textContent = i.id
			phone.textContent = phoneFiltered
			phone.setAttribute('href', "tel:"+phoneFiltered)
			
			for(let x of orders){
					if(Number(i.id) === x.user_id){
						
						let box = document.createElement('div')
						let img = document.createElement('img')
						let innerBox = document.createElement('div')
						let header = document.createElement('h3')
						let par = document.createElement('p')
						let span = document.createElement('span')
		
						box.classList.add('icon')
						innerBox.classList.add('count')

						let foodname 
						let foodPhoto
						let foodCount
						for(let a of foods){
							if(x.food_id === a.food_id){
								foodname = a.food_name
								foodPhoto = a.food_photo
								foodCount = x.count
							}
						}
							
						img.src = foodPhoto
						img.setAttribute('alt', "f")
						img.setAttribute('width', "100")
						img.setAttribute('height', "100")
						header.textContent = foodname
						span.textContent = foodCount + ""
						par.textContent = "Count: " + span.textContent
						
						innerBox.appendChild(header)
						innerBox.appendChild(par)
						box.appendChild(img)
						box.appendChild(innerBox)
						u_orders.appendChild(box)
					}
					//else  if(Number(i.id) !== x.user_id) u_orders.innerHTML = null
				
			}
		}
	}
}

render_orders()

add_order_btn.addEventListener('click', function(){
	let y = {}
	let x = 0
	for(let i of orders){
		if(i.order_id >= x)x=i.user_id
	}
	y.order_id = x + 1
	y.user_id = idSpan.textContent - 0
	y.food_id = food_name.value - 0
	y.count = food_count.value - 0
	orders.push(y)
	render_orders()
})


/*
let name = document.querySelector('.name')
let idSpan = document.querySelector('.id')
let phone = document.querySelector('.phone')

<div class="head">
					<h2 class="name">Sherzod</h2>
					<p>id: <span class="id">10100001</span></p>
					<a class="phone" href="tel:+998991234567">+99899 123-45-67</a>
				</div>
*/

/*
<div class="icon lavash">
						<img src="./img/lavash.webp" alt="l" width="100" height="100">
						<div class="count">
							<h3>lavash</h3>
							<p>Count:<span>1</span></p>
						</div>
					</div>
*/



/*
{
						let box = document.createElement('div')
						let img = document.createElement('img')
						let innerBox = document.createElement('div')
						let head = document.createElement('h3')
						let par = document.createElement('p')
						let span = document.createElement('span')

						box.classList.add('icon')
						let src
						for (let x of foods) {
							src = foods.filter(() => {
								icon.food_id === x.food_id
							})
						}
						img.setAttribute('src', src.food_photo)
						img.setAttribute('alt', "img")
						img.setAttribute('width', "100")
						img.setAttribute("height", "100")

						innerBox.classList.add('count')
						head.textContent = src.food_name
						span.textContent = icon.count
						par.textContent = "Count:"

						par.appendChild(span)
						innerBox.appendChild(head)
						innerBox.appendChild(par)
						box.appendChild(img)
						box.appendChild(innerBox)
						u_orders.appendChild(box)
					}
*/


/*
let users = window.localStorage.getItem('users')
if(!users) users = []
else users = JSON.parse(users)

let foods = window.localStorage.getItem('foods')
if(!foods) foods = []
else foods = JSON.parse(foods)

let orders = window.localStorage.getItem('orders')
if(!orders) orders = []
else orders = JSON.parse(orders)
*/

























/*<ul class="user_list">
					
					<li id="10100002">
						<div>
							<h4 class="user_name">Sherzod</h4>
							<strong class="user_id">10100002</strong>
						</div>
						<p class="user_phone">+99899 123-45-67</p>
					</li>
					<li id="10100003">
						<div>
							<h4 class="user_name">Sherzod</h4>
							<strong class="user_id">10100003</strong>
						</div>
						<p class="user_phone">+99899 123-45-67</p>
					</li>
					<li id="10100004">
						<div>
							<h4 class="user_name">Sherzod</h4>
							<strong class="user_id">10100004</strong>
						</div>
						<p class="user_phone">+99899 123-45-67</p>
					</li>
					<li id="10100005">
						<div>
							<h4 class="user_name">Sherzod</h4>
							<strong class="user_id">10100005</strong>
						</div>
						<p class="user_phone">+99899 123-45-67</p>
					</li>
					<li id="10100006">
						<div>
							<h4 class="user_name">Sherzod</h4>
							<strong class="user_id">10100006</strong>
						</div>
						<p class="user_phone">+99899 123-45-67</p>
					</li>
				</ul>
*/

/*<div class="orders">
					<div class="icon lavash">
						<img src="./img/lavash.webp" alt="l" width="100" height="100">
						<div class="count">
							<h3>lavash</h3>
							<p>Count:<span>1</span></p>
						</div>
					</div>
					<div class="icon burger">
						<img src="./img/burger.jpeg" alt="b" width="100" height="100">
						<div class="count">
							<h3>Burger</h3>
							<p>Count:<span>1</span></p>
						</div>
					</div>
					<div class="icon cola">
						<img src="./img/cola-can.svg" alt="c" width="100" height="100">
						<div class="count">
							<h3>Cola</h3>
							<p>Count:<span>1</span></p>
						</div>
					</div>
					<div class="icon lavash">
						<img src="./img/lavash.webp" alt="l" width="100" height="100">
						<div class="count">
							<h3>Lavash</h3>
							<p>Count:<span>1</span></p>
						</div>
					</div>
				</div>

*/