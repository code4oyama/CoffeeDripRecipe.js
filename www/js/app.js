// コーヒードリップレシピ計算アプリ

// 定数
const CUP_SIZE = {
    small: 250,   // ml
    normal: 330,  // ml
    large: 560    // ml
};
const STRENGTH_RATIO_PRESETS = {
    light: 18.0,  // 1:18.0 (薄め)
    normal: 17.2, // 1:17.2 (普通)
    strong: 15.0  // 1:15.0 (濃いめ)
};
const WARMUP_WATER = 200; // ml (ホットの場合のカップを温める水)
const ICE_AMOUNT = 150; // g (アイスの場合の氷の量/杯)
const BASE_BREW_TIME = 180; // 秒 (3分)

// DOM要素を取得
document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate-btn');
    const cupsInput = document.getElementById('cups');
    const waterRatioInput = document.getElementById('water-ratio');
    const resultSection = document.getElementById('result-section');
    const warmupCard = document.getElementById('warmup-card');
    
    // ラジオボタン
    const radioButtons = document.querySelectorAll('input[name="brew-type"]');
    const cupSizeRadios = document.querySelectorAll('input[name="cup-size"]');
    const strengthRadios = document.querySelectorAll('input[name="strength"]');
    
    // カップサイズ変更時にラベルを更新
    cupSizeRadios.forEach(radio => {
        radio.addEventListener('change', updateCupSizeLabel);
    });

    // 濃さ変更時に豆:お湯比率の初期値を更新
    strengthRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            waterRatioInput.value = STRENGTH_RATIO_PRESETS[this.value].toFixed(1);
        });
    });
    
    // 計算ボタンのクリックイベント
    calculateBtn.addEventListener('click', calculateRecipe);
    
    // Enterキーでも計算
    cupsInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculateRecipe();
        }
    });
});

function updateCupSizeLabel() {
    const cupSize = document.querySelector('input[name="cup-size"]:checked').value;
    const label = document.getElementById('cup-size-label');
    label.textContent = `(${CUP_SIZE[cupSize]}ml/杯)`;
}

function calculateRecipe() {
    // 入力値を取得
    const cups = parseInt(document.getElementById('cups').value);
    const brewType = document.querySelector('input[name="brew-type"]:checked').value;
    const strength = document.querySelector('input[name="strength"]:checked').value;
    const cupSize = document.querySelector('input[name="cup-size"]:checked').value;
    const cupSizeMl = CUP_SIZE[cupSize];
    const waterRatio = parseFloat(document.getElementById('water-ratio').value);
    
    // バリデーション
    if (!cups || cups < 1) {
        alert('カップ数を正しく入力してください');
        return;
    }

    if (!waterRatio || waterRatio <= 0) {
        alert('豆:お湯の比率を正しく入力してください（例: 17）');
        return;
    }

    // 入力値を小数第1位に正規化
    const normalizedWaterRatio = Number(waterRatio.toFixed(1));
    document.getElementById('water-ratio').value = normalizedWaterRatio.toFixed(1);
    
    // レシピ計算
    // 豆:お湯比率（1:x）から豆の量を計算
    const totalWater = cupSizeMl * cups;
    const coffeeBeans = Math.round(totalWater / normalizedWaterRatio);
    
    const recipe = {
        cups: cups,
        cupSize: cupSize,
        cupSizeMl: cupSizeMl,
        brewType: brewType,
        strength: strength,
        waterRatio: normalizedWaterRatio,
        warmupWater: brewType === 'hot' ? WARMUP_WATER * cups : 0,
        iceAmount: brewType === 'iced' ? ICE_AMOUNT * cups : 0,
        coffeeBeans: coffeeBeans,
        totalWater: totalWater,
        brewTime: BASE_BREW_TIME + (cups - 1) * 30 // カップ数に応じて調整
    };
    
    // お湯を注ぐステップを計算
    const pourSteps = calculatePourSteps(recipe.totalWater, recipe.brewTime);
    
    // 結果を表示
    displayRecipe(recipe, pourSteps);
}

function calculatePourSteps(totalWater, totalTime) {
    // 4回に分けてお湯を注ぐ
    const steps = [];
    
    // 1回目: 蒸らし（少量）
    const firstPour = Math.round(totalWater * 0.15);
    steps.push({
        time: 0,
        amount: firstPour,
        cumulative: firstPour,
        description: '1回目 (蒸らし)'
    });
    
    // 蒸らし時間30秒後に2回目
    const secondPour = Math.round(totalWater * 0.30);
    steps.push({
        time: 30,
        amount: secondPour,
        cumulative: firstPour + secondPour,
        description: '2回目'
    });
    
    // 3回目
    const thirdPour = Math.round(totalWater * 0.30);
    const thirdTime = Math.round(totalTime * 0.50);
    steps.push({
        time: thirdTime,
        amount: thirdPour,
        cumulative: firstPour + secondPour + thirdPour,
        description: '3回目'
    });
    
    // 4回目: 残り
    const fourthPour = totalWater - firstPour - secondPour - thirdPour;
    const fourthTime = Math.round(totalTime * 0.75);
    steps.push({
        time: fourthTime,
        amount: fourthPour,
        cumulative: totalWater,
        description: '4回目'
    });
    
    return steps;
}

function displayRecipe(recipe, pourSteps) {
    // 結果セクションを表示
    const resultSection = document.getElementById('result-section');
    resultSection.style.display = 'block';
    
    // 温めるお湯の量（合計）
    const totalHotWater = recipe.warmupWater + recipe.totalWater;
    document.getElementById('total-hot-water').textContent = `${totalHotWater} ml`;
    
    // カップを温める水の量 (ホットのみ)
    const warmupCard = document.getElementById('warmup-card');
    if (recipe.brewType === 'hot') {
        warmupCard.style.display = 'block';
        document.getElementById('warmup-water').textContent = `${recipe.warmupWater} ml`;
    } else {
        warmupCard.style.display = 'none';
    }
    
    // 氷の量 (アイスのみ)
    const iceCard = document.getElementById('ice-card');
    if (recipe.brewType === 'iced') {
        iceCard.style.display = 'block';
        document.getElementById('ice-amount').textContent = `${recipe.iceAmount} g`;
    } else {
        iceCard.style.display = 'none';
    }
    
    // コーヒー豆の量
    document.getElementById('coffee-beans').textContent = `${recipe.coffeeBeans} g`;

    // 豆:お湯の比率
    document.getElementById('brew-ratio').textContent = `1:${recipe.waterRatio.toFixed(1)}`;
    
    // お湯の量
    document.getElementById('total-water').textContent = `${recipe.totalWater} ml`;
    
    // 抽出時間
    const minutes = Math.floor(recipe.brewTime / 60);
    const seconds = recipe.brewTime % 60;
    document.getElementById('brew-time').textContent = `${minutes}分${seconds}秒`;
    
    // お湯を注ぐステップ
    const pourStepsContainer = document.getElementById('pour-steps');
    pourStepsContainer.innerHTML = '';
    
    pourSteps.forEach((step, index) => {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'pour-step';
        
        const timeMinutes = Math.floor(step.time / 60);
        const timeSeconds = step.time % 60;
        const timeStr = step.time === 0 ? '開始時' : `${timeMinutes}分${timeSeconds}秒後`;
        
        stepDiv.innerHTML = `
            <div class="pour-step-header">
                <span class="pour-step-number">${step.description}</span>
                <span class="pour-step-time">${timeStr}</span>
            </div>
            <div class="pour-step-amount">${step.amount} ml（累計: ${step.cumulative} ml）</div>
        `;
        
        pourStepsContainer.appendChild(stepDiv);
    });
    
    // スムーズにスクロール
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
