const canvas = document.getElementById("gameboard");
const context = canvas.getContext("2d");
context.scale(20, 20);

function gameboard_Clear() {
	let row_Count = 1;
	outer: for (let y = gameboard.length - 1; y > 0; --y) {
		for (let x = 0; x < gameboard[y].length; ++x) {
			if (gameboard[y][x] === 0) {
				continue outer;
			}
		}

		const row = gameboard.splice(y, 1)[0].fill(0);
		gameboard.unshift(row);
		++y;

		player.score += row_Count * 10;
		row_Count *= 2;
	}
}

function collide(gameboard, player) {
	const m = player.matrix;
	const o = player.pos;
	for (let y = 0; y < m.length; ++y) {
		for (let x = 0; x < m[y].length; ++x) {
			if (m[y][x] !== 0 && (gameboard[y + o.y] && gameboard[y + o.y][x + o.x]) !== 0) {
				return true;
			}
		}
	}
	return false;
}

function matrix_Create(w, h) {
	const matrix = [];
	while (h--) {
		matrix.push(new Array(w).fill(0));
	}
	return matrix;
}

function block_Create(type) {
	if (type === "I") {
		return [ // Block looks like the shap made of the letter "I" made below
			[0, 1, 0, 0], // I
			[0, 1, 0, 0], // I
			[0, 1, 0, 0], // I
			[0, 1, 0, 0] // I
		];
	} else if (type === "L") {
		return [ // Block looks like the shap made of the letter "L" made below
			[0, 2, 0], // L
			[0, 2, 0], // L
			[0, 2, 2] //  L L
		];
	} else if (type === "J") {
		return [ // Block looks like the shap made of the letter "J" made below
			[0, 3, 0], //  J
			[0, 3, 0], //  J
			[3, 3, 0] // J J
		];
	} else if (type === "O") {
		return [ // Block looks like the shap made of the letter "O" made below
			[4, 4], // O O
			[4, 4] //  O O
		];
	} else if (type === "Z") {
		return [ // Block looks like the shap made of the letter "Z" made below
			[5, 5, 0], // Z Z
			[0, 5, 5], //   Z Z
			[0, 0, 0]
		];
	} else if (type === "S") {
		return [ // Block looks like the shap made of the letter "S" made below
			[0, 6, 6], //   S S
			[6, 6, 0], // S S
			[0, 0, 0]
		];
	} else if (type === "T") {
		return [ // Block looks like the shap made of the letter "T" made below
			[0, 7, 0], //   T
			[7, 7, 7], // T T T
			[0, 0, 0]
		];
	}
}

function matrix_Draw(matrix, offset) {
	matrix.forEach((row, y) => {
		row.forEach((value, x) => {
			if (value !== 0) {
				context.fillStyle = colors[value];
				context.fillRect(x + offset.x, y + offset.y, 1, 1);
				context.strokeStyle = "#000000";
				context.lineWidth = .1;
				context.strokeRect(x + offset.x, y + offset.y, 1, 1);
			}
		});
	});
}

function draw() {
	context.fillStyle = "#424949";
	context.fillRect(0, 0, canvas.width, canvas.height);
	matrix_Draw(gameboard, {
		x: 0,
		y: 0
	});
	matrix_Draw(player.matrix, player.pos);
}

function merge(gameboard, player) {
	player.matrix.forEach((row, y) => {
		row.forEach((value, x) => {
			if (value !== 0) {
				gameboard[y + player.pos.y][x + player.pos.x] = value;
			}
		});
	});
}

function block_Rotate(matrix, dir) {
	for (let y = 0; y < matrix.length; ++y) {
		for (let x = 0; x < y; ++x) {
			[matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
		}
	}

	if (dir > 0) {
		matrix.forEach(row => row.reverse());
	} else {
		matrix.reverse();
	}
}

function player_Drop() {
	player.pos.y++;
	if (collide(gameboard, player)) {
		player.pos.y--;
		merge(gameboard, player);
		player_Reset();
		gameboard_Clear();
		score_Update();
	}
	dropCounter = 0;
}

function player_Move(offset) {
	player.pos.x += offset;
	if (collide(gameboard, player)) {
		player.pos.x -= offset;
	}
}

function player_Reset() {
	const blocks = "TJLOSZI";
	player.matrix = block_Create(blocks[(blocks.length * Math.random()) | 0]);
	player.pos.y = 0;
	player.pos.x =
		((gameboard[0].length / 2) | 0) - ((player.matrix[0].length / 2) | 0);
	if (collide(gameboard, player)) {
		gameboard.forEach(row => row.fill(0));
		player.score = 0;
		score_Update();
	}
}



function player_Rotate(dir) {
	const pos = player.pos.x;
	let offset = 1;
	block_Rotate(player.matrix, dir);
	while (collide(gameboard, player)) {
		player.pos.x += offset;
		offset = -(offset + (offset > 0 ? 1 : -1));
		if (offset > player.matrix[0].length) {
			block_Rotate(player.matrix, -dir);
			player.pos.x = pos;
			return;
		}
	}
}

let dropCounter = 0;
let dropInterval = 500; // How long it takes the current block to lower one row (in milliseconds)

let lastTime = 0;

function update(time = 0) {
	const deltaTime = time - lastTime;

	dropCounter += deltaTime;
	if (dropCounter > dropInterval) {
		player_Drop();
	}

	lastTime = time;

	draw();
	requestAnimationFrame(update);
}

function score_Update() {
	document.getElementById("score").innerText = "Score: " + player.score; // Puts the players current score in the "score" div
}

document.addEventListener("keydown", event => {
	if (event.keyCode === 37) { // Key code 37 is the same as the "left arrow-key"
		player_Move(-1); // Moves the block one column to the left
	} else if (event.keyCode === 39) { // Key code 39 is the same as the "right arrow-key"
		player_Move(1); // Moves the block one column to the right
	} else if (event.keyCode === 40) { // Key code 40 is the same as the "down arrow-key"
		player_Drop(); // Lowers the block one row, this skips the current drop interval
	} else if (event.keyCode === 38) { // Key code 38 is the same as the "up arrow-key"
		player_Rotate(1); // Rotates the block once clockwise
	}
});

const colors = [ // List of colors that will be assigned to the block their order corresponds with
	null,
	"#C62828", // Makes the "I" block appear red
	"#EC407A", // Makes the "L" block appear pink
	"#FFEB3B", // Makes the "J" block appear yellow
	"#303F9F", // Makes the "O" block appear blue
	"#F57C00", // Makes the "Z" block appear orange
	"#4FC3F7", // Makes the "S" block appear cyan
	"#43A047" // Makes the "T" block appear green
];

const gameboard = matrix_Create(12, 20);

const player = {
	pos: {
		x: 0,
		y: 0
	},
	matrix: null,
	score: 0
};

player_Reset();
score_Update();
update();