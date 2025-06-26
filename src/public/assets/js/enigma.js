var som = document.getElementById('som');
function musica() {
    som.play()
}


function verificarResposta(fase) {
    const respostasFases = {
        1: "CLAREZA",
        2: "CONTROLE",
        3: "ALÍVIO",
        4: "DIVISOR DE ÁGUAS",

    };

    const resposta = document.getElementById(`resposta${fase}`).value.toLowerCase();
    const mensagemElemento = document.getElementById(`mensagem${fase}`);

    if (resposta === respostasFases[fase]) {
        mensagemElemento.innerText = fase === 5
            ? "Resposta correta! Parabéns, você completou todas as fases!"
            : "Resposta correta! Avance para a próxima fase.";

        // Esconde a fase atual
        document.getElementById(`fase${fase}`).style.display = "none";

        // Mostra a próxima fase, se houver
        if (fase < 5) {
            document.getElementById(`fase${fase + 1}`).style.display = "block";
        } else {
            document.getElementById("faseFinal").style.display = "block";
        }
    } else {
        mensagemElemento.innerText = "Resposta incorreta. Tente novamente.";
    }
}


const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth * window.devicePixelRatio;
canvas.height = window.innerHeight * window.devicePixelRatio;

canvas.style.width = `${window.innerWidth}px`;
canvas.style.height = `${window.innerHeight}px`;

class Paricle{
    constructor(x, y, effect){
        this.originX = x;
        this.originY = y;
        this.effect = effect;
        this.x = Math.floor(x);
        this.y = Math.floor(y);
        this.ctx = this.effect.ctx;
        this.ctx.fillStyle = 'white';
        this.vx = 0;
        this.vy = 0;
        this.ease = 0.2;
        this.friction = 0.95;
        this.dx = 0;
        this.dy = 0;
        this.distance = 0;
        this.force = 0;
        this.angle = 0;
        this.size = Math.floor(Math.random() * 5);
        this.draw();
    }   

draw(){
    const gradient = this.ctx.createLinearGradient(0, 0, this.effect.width, 0); // horizontal
    gradient.addColorStop(0, '#570735');   // cor inicial
    gradient.addColorStop(1, '#9b59b6');   // cor final

    this.ctx.font = `${10 + this.size * 3}px sans-serif`;

    // Cria um gradiente por caractere com base na posição X da partícula
    const colorPosition = this.x / this.effect.width; // posição da partícula no gradiente (0 a 1)
    const r1 = 137, g1 = 138, b1 = 158;   //rgb(137, 138, 158)
    const r2 = 64, g2 = 58, b2 = 66; //rgb(64, 58, 66)

    const r = Math.floor(r1 + (r2 - r1) * colorPosition);
    const g = Math.floor(g1 + (g2 - g1) * colorPosition);
    const b = Math.floor(b1 + (b2 - b1) * colorPosition);

    this.ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    this.ctx.fillText('?', this.x, this.y);
}



    update(){
        this.dx = this.effect.mouse.x - this.x;
        this.dy = this.effect.mouse.y - this.y;
        this.distance = this.dx * this.dx + this.dy * this.dy;
        this.force = -this.effect.mouse.radius / this.distance * 8;

        if(this.distance < this.effect.mouse.radius){
            this.angle = Math.atan2(this.dy, this.dx);
            this.vx += this.force * Math.cos(this.angle);
            this.vy += this.force * Math.sin(this.angle);
        }

        this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
        this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
        this.draw()
    }
}


class Effect {
    constructor(width, height, context){
        this.width = width;
        this.height = height;
        this.ctx = context;
        this.particlesArray = [];
        this.gap = 20;
        this.mouse = {
            radius: 3000,
            x: 0,
            y: 0
        }
        window.addEventListener('mousemove', e => {
            this.mouse.x = e.clientX * window.devicePixelRatio;
            this.mouse.y = e.pageY * window.devicePixelRatio;
        })

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth * window.devicePixelRatio;
            canvas.height = window.innerHeight * window.devicePixelRatio;
            this.width = canvas.width
            this.height = canvas.height
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
        
            this.particlesArray = [];
            this.init();
        })
        this.init();
    }

    init(){
        for(let x = 0; x < this.width; x += this.gap){
            for(let y = 0; y < this.height; y += this.gap){
                this.particlesArray.push(new Paricle(x, y, this))
            }
        }
    }

    update(){
        this.ctx.clearRect(0, 0, this.width, this.height);
        for(let i = 0; i < this.particlesArray.length; i++){
            this.particlesArray[i].update();
        }
    }
}

let effect = new Effect(canvas.width, canvas.height, ctx);
function animate(){
    effect.update();
    requestAnimationFrame(animate)
}
animate()