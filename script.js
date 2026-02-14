let game = {
    score: 0,
    isPlaying: false,
    isGameOver: false,
    speed: 1,
    obstacleFrequency: 5000,
    minObstacleGap: 1500
};

const pony = document.getElementById('pony');
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');
const startScreenElement = document.getElementById('startScreen');
const gameElement = document.querySelector('.game');

// 初始化游戏
function initGame() {
    // 添加小马的身体
    const pixelBody = document.createElement('div');
    pixelBody.className = 'pixel-body';
    pony.appendChild(pixelBody);
    
    // 添加小马的头部
    const pixelHead = document.createElement('div');
    pixelHead.className = 'pixel-head';
    pony.appendChild(pixelHead);
    
    // 添加头部像素块
    const headTop = document.createElement('div');
    headTop.className = 'head-top';
    pixelHead.appendChild(headTop);
    
    const headMid = document.createElement('div');
    headMid.className = 'head-mid';
    pixelHead.appendChild(headMid);
    
    const headBottom = document.createElement('div');
    headBottom.className = 'head-bottom';
    pixelHead.appendChild(headBottom);
    
    // 添加眼睛
    const eye = document.createElement('div');
    eye.className = 'eye';
    pixelHead.appendChild(eye);
    
    // 添加鼻子
    const nose = document.createElement('div');
    nose.className = 'nose';
    pixelHead.appendChild(nose);
    
    // 添加鬃毛
    const pixelMane = document.createElement('div');
    pixelMane.className = 'pixel-mane';
    pony.appendChild(pixelMane);
    
    const maneTop = document.createElement('div');
    maneTop.className = 'mane-top';
    pixelMane.appendChild(maneTop);
    
    const maneMid = document.createElement('div');
    maneMid.className = 'mane-mid';
    pixelMane.appendChild(maneMid);
    
    const maneBottom = document.createElement('div');
    maneBottom.className = 'mane-bottom';
    pixelMane.appendChild(maneBottom);
    
    // 添加颈部
    const pixelNeck = document.createElement('div');
    pixelNeck.className = 'pixel-neck';
    pony.appendChild(pixelNeck);
    
    // 添加腿部
    const leg1 = document.createElement('div');
    leg1.className = 'pixel-leg front-left';
    pony.appendChild(leg1);
    
    const leg2 = document.createElement('div');
    leg2.className = 'pixel-leg front-right';
    pony.appendChild(leg2);
    
    const leg3 = document.createElement('div');
    leg3.className = 'pixel-leg back-left';
    pony.appendChild(leg3);
    
    const leg4 = document.createElement('div');
    leg4.className = 'pixel-leg back-right';
    pony.appendChild(leg4);
    
    // 添加尾巴
    const pixelTail = document.createElement('div');
    pixelTail.className = 'pixel-tail';
    pony.appendChild(pixelTail);
    
    const tailTop = document.createElement('div');
    tailTop.className = 'tail-top';
    pixelTail.appendChild(tailTop);
    
    const tailMid = document.createElement('div');
    tailMid.className = 'tail-mid';
    pixelTail.appendChild(tailMid);
    
    const tailBottom = document.createElement('div');
    tailBottom.className = 'tail-bottom';
    pixelTail.appendChild(tailBottom);
    
    // 添加可爱标记
    const pixelCutie = document.createElement('div');
    pixelCutie.className = 'pixel-cutie';
    pony.appendChild(pixelCutie);
    
    // 事件监听
    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('click', handleClick);
}

// 处理按键事件
function handleKeyPress(e) {
    if (e.code === 'Space') {
        if (!game.isPlaying && !game.isGameOver) {
            startGame();
        } else if (game.isPlaying && !isJumping()) {
            jump();
        }
    }
}

// 处理点击事件
function handleClick() {
    if (!game.isPlaying && !game.isGameOver) {
        startGame();
    } else if (game.isPlaying && !isJumping()) {
        jump();
    }
}

// 检查是否正在跳跃
function isJumping() {
    return pony.classList.contains('jump');
}

// 小马跳跃
function jump() {
    pony.classList.add('jump');
    setTimeout(() => {
        pony.classList.remove('jump');
    }, 1200);
}

// 开始游戏
function startGame() {
    game.isPlaying = true;
    game.isGameOver = false;
    game.score = 0;
    game.speed = 1;
    
    startScreenElement.style.display = 'none';
    gameOverElement.style.display = 'none';
    scoreElement.textContent = '0';
    
    // 清除现有障碍物
    const existingObstacles = document.querySelectorAll('.obstacle');
    existingObstacles.forEach(obstacle => obstacle.remove());
    
    // 延迟生成第一个障碍物，确保玩家有足够的准备时间
    setTimeout(generateObstacles, 2000);
    
    // 开始游戏循环
    gameLoop();
}

// 生成障碍物
function generateObstacles() {
    if (!game.isPlaying) return;
    
    // 随机生成障碍物间隔，确保不会出现3个连在一起的情况，且间隔大于跳跃时间
    const minGap = game.minObstacleGap;
    const maxGap = game.obstacleFrequency;
    const nextObstacleGap = Math.floor(Math.random() * (maxGap - minGap + 1)) + minGap;
    
    const obstacle = document.createElement('div');
    obstacle.className = 'obstacle';
    obstacle.style.right = '-40px';
    
    // 添加栅栏柱子
    const fencePostLeft = document.createElement('div');
    fencePostLeft.className = 'fence-post';
    obstacle.appendChild(fencePostLeft);
    
    const fencePostRight = document.createElement('div');
    fencePostRight.className = 'fence-post right';
    obstacle.appendChild(fencePostRight);
    
    // 添加栅栏横条
    const fenceRailBottom = document.createElement('div');
    fenceRailBottom.className = 'fence-rail';
    obstacle.appendChild(fenceRailBottom);
    
    const fenceRailTop = document.createElement('div');
    fenceRailTop.className = 'fence-rail top';
    obstacle.appendChild(fenceRailTop);
    
    // 设置障碍物动画 - 更慢的速度
    const animationDuration = 6000 / game.speed;
    obstacle.style.animation = `obstacle ${animationDuration}ms linear`;
    
    gameElement.appendChild(obstacle);
    
    // 障碍物移出屏幕后移除
    setTimeout(() => {
        obstacle.remove();
    }, animationDuration);
    
    // 递归生成下一个障碍物
    setTimeout(generateObstacles, nextObstacleGap);
}

// 游戏循环
function gameLoop() {
    if (!game.isPlaying) return;
    
    // 更新分数
    game.score++;
    scoreElement.textContent = game.score;
    
    // 检测碰撞
    if (checkCollision()) {
        endGame();
        return;
    }
    
    // 继续游戏循环
    requestAnimationFrame(gameLoop);
}

// 检测碰撞 - 只检测马的身体部分，减小碰撞体积
function checkCollision() {
    // 获取马的身体元素
    const ponyBody = pony.querySelector('.pixel-body');
    if (!ponyBody) return false;
    
    const ponyRect = ponyBody.getBoundingClientRect();
    const obstacles = document.querySelectorAll('.obstacle');
    
    for (const obstacle of obstacles) {
        const obstacleRect = obstacle.getBoundingClientRect();
        
        // 只检测身体部分的碰撞，减小碰撞体积
        if (
            ponyRect.left < obstacleRect.right &&
            ponyRect.right > obstacleRect.left &&
            ponyRect.top < obstacleRect.bottom &&
            ponyRect.bottom > obstacleRect.top
        ) {
            return true;
        }
    }
    
    return false;
}

// 结束游戏
function endGame() {
    game.isPlaying = false;
    game.isGameOver = true;
    
    finalScoreElement.textContent = game.score;
    gameOverElement.style.display = 'block';
}

// 重启游戏
function restartGame() {
    startGame();
}

// 初始化游戏
initGame();