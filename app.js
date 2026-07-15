// Data storage
let vocabulary = JSON.parse(localStorage.getItem('vocabulary')) || [];
let progress = JSON.parse(localStorage.getItem('progress')) || {
    wordsLearned: 0,
    exercisesCompleted: 0,
    correctAnswers: 0,
    totalAnswers: 0,
    daysStudied: 0,
    activity: [0, 0, 0, 0, 0, 0, 0]
};

// Grammar rules data
const grammarRules = {
    'present-simple': {
        title: 'Present Simple (Простое настоящее время)',
        content: `
            <h3>Когда используется:</h3>
            <p>• Для описания регулярных действий и привычек</p>
            <p>• Для описания фактов и общих истин</p>
            <p>• Для расписаний и графиков</p>
            
            <h3>Как образуется:</h3>
            <div class="formation-box">
                <div class="formation-item">
                    <span class="formation-symbol">+</span>
                    <span class="formation-text">I/You/We/They + V1</span>
                    <span class="formation-text">He/She/It + V1 + (-s)</span>
                </div>
                <div class="formation-item">
                    <span class="formation-symbol">-</span>
                    <span class="formation-text">do/does + not + V1</span>
                </div>
                <div class="formation-item">
                    <span class="formation-symbol">?</span>
                    <span class="formation-text">Do/Does + S + V1?</span>
                </div>
            </div>
            
            <h3>Маркеры времени:</h3>
            <div class="time-markers">
                <span class="marker">every day</span>
                <span class="marker">always</span>
                <span class="marker">usually</span>
                <span class="marker">often</span>
                <span class="marker">sometimes</span>
                <span class="marker">never</span>
                <span class="marker">on Mondays</span>
                <span class="marker">every week</span>
                <span class="marker">rarely</span>
                <span class="marker">generally</span>
            </div>
            
            <div class="example">
                <strong>Примеры:</strong><br>
                I work <strong>every day</strong>.<br>
                She <strong>always</strong> drinks coffee in the morning.<br>
                They <strong>usually</strong> go to the gym <strong>on Mondays</strong>.<br>
                He <strong>never</strong> eats meat.
            </div>
        `
    },
    'present-continuous': {
        title: 'Present Continuous (Настоящее длительное время)',
        content: `
            <h3>Когда используется:</h3>
            <p>• Для действий, происходящих прямо сейчас</p>
            <p>• Для временных ситуаций</p>
            <p>• Для запланированных будущих действий</p>
            
            <h3>Как образуется:</h3>
            <div class="formation-box">
                <div class="formation-item">
                    <span class="formation-symbol">+</span>
                    <span class="formation-text">am/is/are + V1 + (-ing)</span>
                </div>
                <div class="formation-item">
                    <span class="formation-symbol">-</span>
                    <span class="formation-text">am/is/are + not + V1 + (-ing)</span>
                </div>
                <div class="formation-item">
                    <span class="formation-symbol">?</span>
                    <span class="formation-text">Am/Is/Are + S + V1 + (-ing)?</span>
                </div>
            </div>
            
            <h3>Маркеры времени:</h3>
            <div class="time-markers">
                <span class="marker">now</span>
                <span class="marker">at the moment</span>
                <span class="marker">right now</span>
                <span class="marker">currently</span>
                <span class="marker">at present</span>
                <span class="marker">today</span>
                <span class="marker">this week</span>
                <span class="marker">these days</span>
                <span class="marker">Look!</span>
                <span class="marker">Listen!</span>
            </div>
            
            <div class="example">
                <strong>Примеры:</strong><br>
                I am working <strong>now</strong>.<br>
                She is reading a book <strong>at the moment</strong>.<br>
                They are playing football <strong>this week</strong>.<br>
                <strong>Look!</strong> It is raining.
            </div>
        `
    },
    'past-simple': {
        title: 'Past Simple (Простое прошедшее время)',
        content: `
            <h3>Когда используется:</h3>
            <p>• Для действий, завершённых в прошлом</p>
            <p>• Для действий в определённое время в прошлом</p>
            <p>• Для последовательности действий в прошлом</p>
            
            <h3>Как образуется:</h3>
            <div class="formation-box">
                <div class="formation-item">
                    <span class="formation-symbol">+</span>
                    <span class="formation-text">V2 / V-ed</span>
                </div>
                <div class="formation-item">
                    <span class="formation-symbol">-</span>
                    <span class="formation-text">did + not + V1</span>
                </div>
                <div class="formation-item">
                    <span class="formation-symbol">?</span>
                    <span class="formation-text">Did + S + V1?</span>
                </div>
            </div>
            
            <h3>Маркеры времени:</h3>
            <div class="time-markers">
                <span class="marker">yesterday</span>
                <span class="marker">last week</span>
                <span class="marker">last month</span>
                <span class="marker">last year</span>
                <span class="marker">2 days ago</span>
                <span class="marker">in 2010</span>
                <span class="marker">in 1999</span>
                <span class="marker">last night</span>
                <span class="marker">this morning</span>
                <span class="marker">ago</span>
            </div>
            
            <div class="example">
                <strong>Примеры:</strong><br>
                I visited London <strong>last year</strong>.<br>
                She went to the cinema <strong>yesterday</strong>.<br>
                They moved here <strong>2 years ago</strong>.<br>
                He graduated <strong>in 2015</strong>.
            </div>
        `
    },
    'articles': {
        title: 'Артикли (a, an, the)',
        content: `
            <h3>Неопределённый артикль (a/an):</h3>
            <p>• Используется с исчисляемыми существительными в единственном числе</p>
            <p>• a - перед согласными звуками (a book, a cat)</p>
            <p>• an - перед гласными звуками (an apple, an hour)</p>
            <p>• Когда упоминаем что-то впервые</p>
            
            <h3>Определённый артикль (the):</h3>
            <p>• Когда уже говорили об этом предмете</p>
            <p>• Когда предмет единственный в своём роде (the sun, the moon)</p>
            <p>• С названиями рек, океанов, гор (the Thames, the Atlantic)</p>
            
            <div class="example">
                <strong>Примеры:</strong><br>
                I saw a cat. The cat was black.<br>
                The sun is bright.<br>
                An apple a day keeps the doctor away.
            </div>
        `
    },
    'conditionals': {
        title: 'Conditionals (Условные предложения)',
        content: `
            <h3>Как отличать условные предложения:</h3>
            <p>Смотрите на <strong>реальность</strong> ситуации и на <strong>время</strong>, о котором идёт речь.</p>
            
            <div class="conditional-type">
                <h4>🟢 Zero Conditional - Общие истины</h4>
                <p><strong>Когда:</strong> Всегда верно, научные факты, законы природы</p>
                <p><strong>Формула:</strong> If + Present Simple, Present Simple</p>
                <p><strong>Маркер:</strong> Нет маркеров времени, это всегда правда</p>
                <div class="example">
                    If you <strong>heat</strong> ice, it <strong>melts</strong>.<br>
                    If you <strong>mix</strong> red and blue, you <strong>get</strong> purple.
                </div>
            </div>
            
            <div class="conditional-type">
                <h4>🟡 First Conditional - Реальное будущее</h4>
                <p><strong>Когда:</strong> Реальная возможность в будущем, вероятно случится</p>
                <p><strong>Формула:</strong> If + Present Simple, will + V1</p>
                <p><strong>Маркеры:</strong> tomorrow, next week, if (реальное условие)</p>
                <div class="example">
                    If it <strong>rains</strong> tomorrow, I <strong>will stay</strong> at home.<br>
                    If you <strong>study</strong> hard, you <strong>will pass</strong> the exam.
                </div>
            </div>
            
            <div class="conditional-type">
                <h4>🟠 Second Conditional - Нереальное настоящее/будущее</h4>
                <p><strong>Когда:</strong> Воображаемая ситуация сейчас или в будущем, маловероятно</p>
                <p><strong>Формула:</strong> If + Past Simple, would + V1</p>
                <p><strong>Маркеры:</strong> сейчас, но это не правда; мечты</p>
                <div class="example">
                    If I <strong>were</strong> rich, I <strong>would travel</strong> the world.<br>
                    If I <strong>had</strong> time, I <strong>would help</strong> you.
                </div>
            </div>
            
            <div class="conditional-type">
                <h4>🔴 Third Conditional - Нереальное прошлое</h4>
                <p><strong>Когда:</strong> Сожаление о прошлом, что уже не изменить</p>
                <p><strong>Формула:</strong> If + Past Perfect, would have + V3</p>
                <p><strong>Маркеры:</strong> вчера, в прошлом, сожаление</p>
                <div class="example">
                    If I <strong>had known</strong>, I <strong>would have called</strong> you.<br>
                    If it <strong>hadn't rained</strong>, we <strong>would have gone</strong> outside.
                </div>
            </div>
            
            <h3>Быстрая проверка:</h3>
            <div class="time-markers">
                <span class="marker">всегда правда → Zero</span>
                <span class="marker">реальное будущее → First</span>
                <span class="marker">мечта/нереально → Second</span>
                <span class="marker">сожаление о прошлом → Third</span>
            </div>
        `
    },
    'modals': {
        title: 'Modal Verbs (Модальные глаголы)',
        content: `
            <h3>Can / Could:</h3>
            <p>• Can - способность, возможность в настоящем</p>
            <p>• Could - способность в прошлом, вежливая просьба</p>
            <p>I can swim. / Could you help me?</p>
            
            <h3>Must / Have to:</h3>
            <p>• Must - личное обязательство</p>
            <p>• Have to - внешнее обязательство</p>
            <p>I must study. / I have to work.</p>
            
            <h3>Should / Ought to:</h3>
            <p>• Совет или рекомендация</p>
            <p>You should eat more vegetables.</p>
            
            <h3>May / Might:</h3>
            <p>• Возможность или разрешение</p>
            <p>It may rain. / Might I come in?</p>
            
            <div class="example">
                <strong>Особенности:</strong><br>
                • После модальных глаголов не добавляется -s в 3-м лице<br>
                • После модальных глаголов используется инфинитив без to<br>
                • Модальные глаголы не имеют всех временных форм
            </div>
        `
    },
    'much-many': {
        title: 'Much / Many (Много)',
        content: `
            <h3>Правило:</h3>
            <p><strong>Much</strong> - с неисчисляемыми существительными (вода, деньги, время)</p>
            <p><strong>Many</strong> - с исчисляемыми существительными (книги, люди, машины)</p>
            
            <div class="example">
                <strong>Примеры:</strong><br>
                I don't have <strong>much</strong> time.<br>
                There are <strong>many</strong> people here.<br>
                How <strong>much</strong> money do you have?<br>
                <strong>Many</strong> students study English.
            </div>
            
            <h3>В вопросах и отрицаниях:</h3>
            <p>• Much/many - в вопросах и отрицаниях</p>
            <p>• A lot of / lots of - в утвердительных предложениях</p>
            
            <div class="example">
                I don't have <strong>much</strong> money.<br>
                I have <strong>a lot of</strong> money.<br>
                Are there <strong>many</strong> people?<br>
                There are <strong>a lot of</strong> people.
            </div>
        `
    },
    'too-enough': {
        title: 'Too / Enough / So / Such',
        content: `
            <h3>Too (слишком) - отрицательное значение</h3>
            <p><strong>Too + adjective</strong> - слишком (плохо)</p>
            <div class="example">
                The coffee is <strong>too hot</strong> (нельзя пить).<br>
                It's <strong>too cold</strong> to go outside.
            </div>
            
            <h3>Enough (достаточно) - положительное значение</h3>
            <p><strong>Adjective + enough</strong> - достаточно (хорошо)</p>
            <div class="example">
                The coffee is <strong>hot enough</strong> (можно пить).<br>
                He is <strong>tall enough</strong> to reach the shelf.
            </div>
            
            <h3>So (так) - усиление</h3>
            <p><strong>So + adjective</strong> - настолько, так</p>
            <div class="example">
                The coffee is <strong>so hot</strong>!<br>
                She is <strong>so beautiful</strong>.
            </div>
            
            <h3>Such (такой) - с существительными</h3>
            <p><strong>Such + (a/an) + noun</strong> - такой</p>
            <div class="example">
                It's <strong>such a beautiful</strong> day!<br>
                They are <strong>such nice</strong> people.
            </div>
            
            <h3>Быстрая памятка:</h3>
            <div class="time-markers">
                <span class="marker">too = слишком (плохо)</span>
                <span class="marker">enough = достаточно (хорошо)</span>
                <span class="marker">so = так (усиление)</span>
                <span class="marker">such = такой (с сущ.)</span>
            </div>
        `
    },
    'have-tenses': {
        title: 'Have Tenses (Времена с have)',
        content: `
            <h3>Present Perfect (have/has + V3)</h3>
            <p><strong>Когда:</strong> Результат в настоящем, действие завершено, но время не важно</p>
            <p><strong>Маркеры:</strong> already, just, yet, ever, never</p>
            <div class="formation-box">
                <div class="formation-item">
                    <span class="formation-symbol">+</span>
                    <span class="formation-text">have/has + V3</span>
                </div>
                <div class="formation-item">
                    <span class="formation-symbol">-</span>
                    <span class="formation-text">have/has + not + V3</span>
                </div>
                <div class="formation-item">
                    <span class="formation-symbol">?</span>
                    <span class="formation-text">Have/Has + S + V3?</span>
                </div>
            </div>
            <div class="example">
                I <strong>have finished</strong> my homework.<br>
                She <strong>has just arrived</strong>.<br>
                Have you <strong>ever been</strong> to London?
            </div>
            
            <h3>Past Perfect (had + V3)</h3>
            <p><strong>Когда:</strong> Действие завершено ДО другого действия в прошлом</p>
            <p><strong>Маркер:</strong> By the time, before, after</p>
            <div class="formation-box">
                <div class="formation-item">
                    <span class="formation-symbol">+</span>
                    <span class="formation-text">had + V3</span>
                </div>
                <div class="formation-item">
                    <span class="formation-symbol">-</span>
                    <span class="formation-text">had + not + V3</span>
                </div>
                <div class="formation-item">
                    <span class="formation-symbol">?</span>
                    <span class="formation-text">Had + S + V3?</span>
                </div>
            </div>
            <div class="example">
                I <strong>had finished</strong> before he came.<br>
                She <strong>had already left</strong> when I arrived.
            </div>
            
            <h3>Present Perfect Continuous (have/has been + V-ing)</h3>
            <p><strong>Когда:</strong> Действие началось в прошлом и продолжается сейчас</p>
            <p><strong>Маркеры:</strong> for, since, all day, how long</p>
            <div class="formation-box">
                <div class="formation-item">
                    <span class="formation-symbol">+</span>
                    <span class="formation-text">have/has + been + V1 + (-ing)</span>
                </div>
                <div class="formation-item">
                    <span class="formation-symbol">-</span>
                    <span class="formation-text">have/has + not + been + V1 + (-ing)</span>
                </div>
                <div class="formation-item">
                    <span class="formation-symbol">?</span>
                    <span class="formation-text">Have/Has + S + been + V1 + (-ing)?</span>
                </div>
            </div>
            <div class="example">
                I <strong>have been working</strong> here for 5 years.<br>
                She <strong>has been studying</strong> all morning.
            </div>
            
            <h3>Как отличать:</h3>
            <div class="time-markers">
                <span class="marker">результат сейчас → Present Perfect</span>
                <span class="marker">до другого в прошлом → Past Perfect</span>
                <span class="marker">длится сейчас → Pres. Perf. Cont.</span>
            </div>
        `
    },
    'some-any': {
        title: 'Some / Any (Некоторый / Любой)',
        content: `
            <h3>Some (некоторый, немного)</h3>
            <p><strong>Когда:</strong> В утвердительных предложениях, в предложениях и просьбах</p>
            <div class="example">
                I have <strong>some</strong> money.<br>
                Would you like <strong>some</strong> coffee?<br>
                Can I have <strong>some</strong> water?
            </div>
            
            <h3>Any (любой, никакой)</h3>
            <p><strong>Когда:</strong> В вопросительных и отрицательных предложениях</p>
            <div class="example">
                I don't have <strong>any</strong> money.<br>
                Do you have <strong>any</strong> questions?<br>
                There isn't <strong>any</strong> milk left.
            </div>
            
            <h3>Исключения:</h3>
            <p>• <strong>Some</strong> в вопросах = ожидаем ответ "да" или это предложение</p>
            <p>• <strong>Any</strong> в утверждениях = "любой" (в любом значении)</p>
            
            <div class="example">
                Would you like <strong>some</strong> tea? (предложение)<br>
                You can take <strong>any</strong> book you want. (любой)
            </div>
            
            <h3>Исчисляемые vs Неисчисляемые:</h3>
            <div class="countable-box">
                <h4>✅ Исчисляемые (Countable)</h4>
                <p>Можно посчитать: 1, 2, 3... Есть форма множественного числа</p>
                <div class="example">
                    <strong>Примеры:</strong> book → books, car → cars, person → people<br>
                    <strong>Проверка:</strong> Можно ли сказать "один/два/три"? Если да - исчисляемое
                </div>
            </div>
            
            <div class="countable-box">
                <h4>❌ Неисчисляемые (Uncountable)</h4>
                <p>Нельзя посчитать. Нет формы множественного числа</p>
                <div class="example">
                    <strong>Примеры:</strong> water, money, time, information, advice, news<br>
                    <strong>Проверка:</strong> Можно ли сказать "один/два/три"? Если нет - неисчисляемое
                </div>
            </div>
            
            <h3>С some/any:</h3>
            <div class="example">
                <strong>Some/any + исчисляемые (мн.ч.):</strong> some books, any questions<br>
                <strong>Some/any + неисчисляемые:</strong> some water, any money
            </div>
        `
    },
    'few-little': {
        title: 'Few / Little / A few / A little',
        content: `
            <h3>Разница в значении:</h3>
            <p><strong>Without "a"</strong> = отрицательное значение (мало, недостаточно)</p>
            <p><strong>With "a"</strong> = положительное значение (немного, но есть)</p>
            
            <h3>С исчисляемыми (Few / A few):</h3>
            <div class="example">
                <strong>Few friends</strong> = мало друзей (плохо, одиноко)<br>
                <strong>A few friends</strong> = несколько друзей (неплохо, есть друзья)
            </div>
            
            <h3>С неисчисляемыми (Little / A little):</h3>
            <div class="example">
                <strong>Little money</strong> = мало денег (не хватает)<br>
                <strong>A little money</strong> = немного денег (хватает на что-то)
            </div>
            
            <h3>Быстрая памятка:</h3>
            <div class="time-markers">
                <span class="marker">few = мало (плохо)</span>
                <span class="marker">a few = немного (хорошо)</span>
                <span class="marker">little = мало (плохо)</span>
                <span class="marker">a little = немного (хорошо)</span>
            </div>
            
            <h3>Примеры:</h3>
            <div class="example">
                I have <strong>few</strong> opportunities. (грустно)<br>
                I have <strong>a few</strong> opportunities. (оптимистично)<br>
                We have <strong>little</strong> time. (проблема)<br>
                We have <strong>a little</strong> time. (можем что-то сделать)
            </div>
        `
    }
};

// Dictionary for suggestions
const wordDictionary = {
    'abundant': { transcription: '/əˈbʌndənt/', translations: ['обильный', 'изобилующий'], examples: ['The forest has abundant wildlife.', 'She has abundant energy.'] },
    'meticulous': { transcription: '/məˈtɪkjələs/', translations: ['тщательный', 'внимательный'], examples: ['She is meticulous about her work.', 'He keeps meticulous records.'] },
    'ephemeral': { transcription: '/ɪˈfemərəl/', translations: ['мимолётный', 'кратковременный'], examples: ['Fame can be ephemeral.', 'The beauty of sunset is ephemeral.'] },
    'resilient': { transcription: '/rɪˈzɪliənt/', translations: ['устойчивый', 'эластичный'], examples: ['Children are often resilient.', 'The material is resilient to stress.'] },
    'eloquent': { transcription: '/ˈeləkwənt/', translations: ['красноречивый', 'выразительный'], examples: ['He gave an eloquent speech.', 'She is an eloquent writer.'] },
    'pragmatic': { transcription: '/præɡˈmætɪk/', translations: ['прагматичный', 'практичный'], examples: ['She takes a pragmatic approach.', 'We need a pragmatic solution.'] },
    'ambiguous': { transcription: '/æmˈbɪɡjuəs/', translations: ['неоднозначный', 'двусмысленный'], examples: ['The message was ambiguous.', 'His answer was ambiguous.'] },
    'diligent': { transcription: '/ˈdɪlɪdʒənt/', translations: ['усердный', 'трудолюбивый'], examples: ['He is a diligent student.', 'She is diligent in her studies.'] },
    'versatile': { transcription: '/ˈvɜːsətaɪl/', translations: ['универсальный', 'разносторонний'], examples: ['She is a versatile actress.', 'This tool is versatile.'] },
    'profound': { transcription: '/prəˈfaʊnd/', translations: ['глубокий', 'серьёзный'], examples: ['The book had a profound impact.', 'He has profound knowledge.'] },
    'inevitable': { transcription: '/ɪnˈevɪtəbl/', translations: ['неизбежный', 'неминуемый'], examples: ['Change is inevitable.', 'Death is inevitable.'] },
    'spontaneous': { transcription: '/spɒnˈteɪniəs/', translations: ['спонтанный', 'самопроизвольный'], examples: ['It was a spontaneous decision.', 'She has a spontaneous personality.'] },
    'compassionate': { transcription: '/kəmˈpæʃənət/', translations: ['сострадательный', 'милосердный'], examples: ['She is compassionate toward others.', 'A compassionate leader.'] },
    'innovative': { transcription: '/ˈɪnəvətɪv/', translations: ['инновационный', 'новаторский'], examples: ['The company is innovative.', 'We need innovative ideas.'] },
    'persistent': { transcription: '/pəˈsɪstənt/', translations: ['настойчивый', 'упорный'], examples: ['He is persistent in his efforts.', 'Persistent problems require solutions.'] },
    'curious': { transcription: '/ˈkjʊəriəs/', translations: ['любопытный', 'заинтересованный'], examples: ['She is curious about everything.', 'A curious mind learns more.'] },
    'efficient': { transcription: '/ɪˈfɪʃənt/', translations: ['эффективный', 'рациональный'], examples: ['This method is efficient.', 'She is an efficient worker.'] },
    'genuine': { transcription: '/ˈdʒenjuɪn/', translations: ['настоящий', 'искренний'], examples: ['Her concern is genuine.', 'This is a genuine leather bag.'] },
    'optimistic': { transcription: '/ˌɒptɪˈmɪstɪk/', translations: ['оптимистичный', 'положительный'], examples: ['She is optimistic about the future.', 'An optimistic attitude helps.'] },
    'pessimistic': { transcription: '/ˌpesɪˈmɪstɪk/', translations: ['пессимистичный', 'отрицательный'], examples: ['He is pessimistic about the outcome.', 'A pessimistic view of life.'] }
};

// Random words database
const randomWords = [
    { english: 'abundant', russian: 'обильный', example: 'The forest has abundant wildlife.' },
    { english: 'meticulous', russian: 'тщательный', example: 'She is meticulous about her work.' },
    { english: 'ephemeral', russian: 'мимолётный', example: 'Fame can be ephemeral.' },
    { english: 'resilient', russian: 'устойчивый', example: 'Children are often resilient.' },
    { english: 'eloquent', russian: 'красноречивый', example: 'He gave an eloquent speech.' },
    { english: 'pragmatic', russian: 'прагматичный', example: 'She takes a pragmatic approach.' },
    { english: 'ambiguous', russian: 'неоднозначный', example: 'The message was ambiguous.' },
    { english: 'diligent', russian: 'усердный', example: 'He is a diligent student.' },
    { english: 'versatile', russian: 'универсальный', example: 'She is a versatile actress.' },
    { english: 'profound', russian: 'глубокий', example: 'The book had a profound impact.' },
    { english: 'inevitable', russian: 'неизбежный', example: 'Change is inevitable.' },
    { english: 'spontaneous', russian: 'спонтанный', example: 'It was a spontaneous decision.' },
    { english: 'meticulous', russian: 'внимательный', example: 'He keeps meticulous records.' },
    { english: 'compassionate', russian: 'сострадательный', example: 'She is compassionate toward others.' },
    { english: 'innovative', russian: 'инновационный', example: 'The company is innovative.' }
];

let currentRandomWord = null;

// Practice exercises
const_exercises = {
    'fill-blanks': [
        {
            question: 'She ___ to the gym every day.',
            options: ['go', 'goes', 'going', 'went'],
            correct: 1
        },
        {
            question: 'They ___ football now.',
            options: ['play', 'plays', 'are playing', 'played'],
            correct: 2
        },
        {
            question: 'I ___ my homework yesterday.',
            options: ['finish', 'finished', 'finishing', 'finishes'],
            correct: 1
        },
        {
            question: 'He ___ speak English well.',
            options: ['can', 'must', 'should', 'would'],
            correct: 0
        },
        {
            question: 'If it rains, we ___ inside.',
            options: ['stay', 'stayed', 'will stay', 'staying'],
            correct: 2
        },
        {
            question: 'There isn\'t ___ milk in the fridge.',
            options: ['some', 'any', 'many', 'few'],
            correct: 1
        },
        {
            question: 'How ___ apples do you need?',
            options: ['much', 'many', 'little', 'few'],
            correct: 1
        },
        {
            question: 'She has ___ friends in this city.',
            options: ['a few', 'a little', 'much', 'too'],
            correct: 0
        },
        {
            question: 'I need ___ water, please.',
            options: ['a few', 'a little', 'many', 'few'],
            correct: 1
        },
        {
            question: 'This coffee is ___ hot to drink.',
            options: ['too', 'enough', 'so', 'such'],
            correct: 0
        },
        {
            question: 'He isn\'t old ___ to drive a car.',
            options: ['too', 'enough', 'so', 'such'],
            correct: 1
        },
        {
            question: '___ sun is shining brightly today.',
            options: ['A', 'An', 'The', '—'],
            correct: 2
        },
        {
            question: 'She ___ been to Paris three times.',
            options: ['has', 'have', 'is', 'was'],
            correct: 0
        },
        {
            question: 'You ___ smoke here. It\'s forbidden.',
            options: ['can', 'mustn\'t', 'should', 'may'],
            correct: 1
        }
    ],
    'choose-correct': [
        {
            question: 'Выберите правильный вариант: I ___ a student.',
            options: ['am', 'is', 'are', 'be'],
            correct: 0
        },
        {
            question: 'Выберите правильный вариант: She ___ like coffee.',
            options: ["don't", "doesn't", "isn't", "aren't"],
            correct: 1
        },
        {
            question: 'Выберите правильный вариант: ___ you work here?',
            options: ['Do', 'Does', 'Did', 'Are'],
            correct: 0
        },
        {
            question: 'Выберите правильный вариант: There are ___ apples on the table.',
            options: ['a', 'an', 'the', 'two'],
            correct: 3
        },
        {
            question: 'Выберите правильный вариант: I would go if I ___ time.',
            options: ['have', 'had', 'will have', 'having'],
            correct: 1
        },
        {
            question: 'Выберите правильный вариант: Would you like ___ tea?',
            options: ['some', 'any', 'many', 'few'],
            correct: 0
        },
        {
            question: 'Выберите правильный вариант: There is ___ sugar left.',
            options: ['few', 'little', 'many', 'a few'],
            correct: 1
        },
        {
            question: 'Выберите правильный вариант: She is ___ a kind person!',
            options: ['so', 'such', 'too', 'enough'],
            correct: 1
        },
        {
            question: 'Выберите правильный вариант: He ___ his keys. He can\'t find them.',
            options: ['loses', 'has lost', 'is losing', 'lost yesterday'],
            correct: 1
        },
        {
            question: 'Выберите правильный вариант: I ___ breakfast at 8 o\'clock every day.',
            options: ['am having', 'have', 'has', 'had'],
            correct: 1
        },
        {
            question: 'Выберите правильный вариант: ___ honest man told us the truth.',
            options: ['A', 'An', 'The', '—'],
            correct: 1
        },
        {
            question: 'Выберите правильный вариант: You ___ see a doctor. You look ill.',
            options: ['can', 'must', 'may', 'would'],
            correct: 1
        },
        {
            question: 'Выберите правильный вариант: If I ___ you, I would apologize.',
            options: ['am', 'was', 'were', 'be'],
            correct: 2
        },
        {
            question: 'Выберите правильный вариант: How ___ time do we have?',
            options: ['many', 'much', 'few', 'a few'],
            correct: 1
        }
    ],
    'translate': [
        {
            question: 'Переведите: "Я работаю каждый день"',
            options: ['I work every day', 'I am working every day', 'I worked every day', 'I will work every day'],
            correct: 0
        },
        {
            question: 'Переведите: "Она читает книгу сейчас"',
            options: ['She reads a book', 'She is reading a book now', 'She read a book', 'She will read a book'],
            correct: 1
        },
        {
            question: 'Переведите: "Они пошли в кино вчера"',
            options: ['They go to the cinema', 'They are going to the cinema', 'They went to the cinema yesterday', 'They will go to the cinema'],
            correct: 2
        },
        {
            question: 'Переведите: "Я могу говорить по-английски"',
            options: ['I must speak English', 'I can speak English', 'I should speak English', 'I may speak English'],
            correct: 1
        },
        {
            question: 'Переведите: "Если бы я был богат, я бы путешествовал"',
            options: ['If I am rich, I will travel', 'If I was rich, I travelled', 'If I were rich, I would travel', 'If I had been rich, I would have travelled'],
            correct: 2
        },
        {
            question: 'Переведите: "У меня мало времени"',
            options: ['I have a few time', 'I have little time', 'I have few time', 'I have a little times'],
            correct: 1
        },
        {
            question: 'Переведите: "У неё есть несколько друзей"',
            options: ['She has a little friends', 'She has few friends', 'She has a few friends', 'She has much friends'],
            correct: 2
        },
        {
            question: 'Переведите: "Это слишком дорого"',
            options: ['It is enough expensive', 'It is too expensive', 'It is so expensive a', 'It is such expensive'],
            correct: 1
        },
        {
            question: 'Переведите: "Тебе нельзя здесь курить"',
            options: ['You mustn\'t smoke here', 'You don\'t smoke here', 'You shouldn\'t smoked here', 'You can\'t to smoke here'],
            correct: 0
        },
        {
            question: 'Переведите: "Он уже сделал домашнее задание"',
            options: ['He already did homework', 'He has already done his homework', 'He is already doing homework', 'He had already do homework'],
            correct: 1
        },
        {
            question: 'Переведите: "Сколько сахара тебе нужно?"',
            options: ['How many sugar do you need?', 'How much sugar do you need?', 'How few sugar do you need?', 'How little sugars do you need?'],
            correct: 1
        },
        {
            question: 'Переведите: "Она такая умная девочка!"',
            options: ['She is so smart girl!', 'She is such a smart girl!', 'She is too a smart girl!', 'She is enough smart girl!'],
            correct: 1
        },
        {
            question: 'Переведите: "Я обычно завтракаю в 7 утра"',
            options: ['I am usually having breakfast at 7 am', 'I usually have breakfast at 7 am', 'I had usually breakfast at 7 am', 'I have usually breakfast at 7 am'],
            correct: 1
        },
        {
            question: 'Переведите: "Есть ли у тебя какие-нибудь вопросы?"',
            options: ['Do you have any questions?', 'Do you have some questions?', 'Are you have any questions?', 'Do you have much questions?'],
            correct: 0
        }
    ],
    'tense-comparison': [
        {
            question: 'Present Simple vs Present Continuous: She ___ to the gym now.',
            options: ['goes', 'is going', 'go', 'went'],
            correct: 1
        },
        {
            question: 'Present Simple vs Present Continuous: I usually ___ coffee in the morning.',
            options: ['drink', 'am drinking', 'drinks', 'drank'],
            correct: 0
        },
        {
            question: 'Present Simple vs Past Simple: She ___ to London last year.',
            options: ['goes', 'went', 'is going', 'has gone'],
            correct: 1
        },
        {
            question: 'Present Simple vs Past Simple: They ___ football every Sunday.',
            options: ['play', 'played', 'are playing', 'were playing'],
            correct: 0
        },
        {
            question: 'Past Simple vs Present Perfect: I ___ my homework yesterday.',
            options: ['have finished', 'finished', 'finish', 'had finished'],
            correct: 1
        },
        {
            question: 'Past Simple vs Present Perfect: She ___ already ___ her dinner.',
            options: ['did ... finish', 'has ... finished', 'finished', 'was finishing'],
            correct: 1
        },
        {
            question: 'Present Continuous vs Present Perfect: I ___ for this company for 5 years.',
            options: ['work', 'am working', 'have been working', 'worked'],
            correct: 2
        },
        {
            question: 'Present Continuous vs Present Perfect: Look! It ___ right now.',
            options: ['rains', 'is raining', 'has rained', 'rained'],
            correct: 1
        },
        {
            question: 'Present Simple vs Present Continuous: Listen! The baby ___.',
            options: ['cries', 'is crying', 'cried', 'has cried'],
            correct: 1
        },
        {
            question: 'Present Simple vs Present Continuous: Water ___ at 100°C.',
            options: ['boils', 'is boiling', 'boiled', 'has boiled'],
            correct: 0
        },
        {
            question: 'Past Simple vs Present Perfect: I ___ him last week.',
            options: ['have seen', 'saw', 'see', 'am seeing'],
            correct: 1
        },
        {
            question: 'Past Simple vs Present Perfect: She ___ never ___ sushi.',
            options: ['did ... try', 'has ... tried', 'tried', 'was trying'],
            correct: 1
        },
        {
            question: 'Present Perfect vs Past Simple: We ___ in London for two years (still there).',
            options: ['lived', 'have lived', 'live', 'are living'],
            correct: 1
        },
        {
            question: 'Present Perfect vs Past Simple: They ___ in London in 2019.',
            options: ['have lived', 'lived', 'live', 'are living'],
            correct: 1
        },
        {
            question: 'Present Continuous vs Present Perfect Continuous: I ___ for you since 5 o\'clock.',
            options: ['wait', 'am waiting', 'have been waiting', 'waited'],
            correct: 2
        },
        {
            question: 'Present Continuous vs Present Perfect Continuous: She ___ TV at the moment.',
            options: ['watches', 'is watching', 'has watched', 'has been watching'],
            correct: 1
        },
        {
            question: 'Past Simple vs Past Continuous: While I ___, the phone rang.',
            options: ['cooked', 'was cooking', 'have cooked', 'cook'],
            correct: 1
        }
    ]
};

// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const grammarContent = document.getElementById('grammar-content');
const topicCards = document.querySelectorAll('.topic-card');
const practiceBtns = document.querySelectorAll('.practice-btn');
const practiceArea = document.getElementById('practice-area');
const addWordBtn = document.getElementById('add-word-btn');
const wordForm = document.getElementById('word-form');
const saveWordBtn = document.getElementById('save-word');
const cancelWordBtn = document.getElementById('cancel-word');
const vocabularyList = document.getElementById('vocabulary-list');
const englishWordInput = document.getElementById('english-word');
const transcriptionInput = document.getElementById('transcription');
const russianWordInput = document.getElementById('russian-word');
const wordExampleInput = document.getElementById('word-example');
const suggestionsDiv = document.getElementById('suggestions');
const translationSuggestions = document.getElementById('translation-suggestions');
const exampleSuggestions = document.getElementById('example-suggestions');
const startFlashcardsBtn = document.getElementById('start-flashcards');
const flashcardArea = document.getElementById('flashcard-area');
const flashcard = document.getElementById('flashcard');
const flashcardWord = document.getElementById('flashcard-word');
const flashcardTranslation = document.getElementById('flashcard-translation');
const flashcardExample = document.getElementById('flashcard-example');
const flipCardBtn = document.getElementById('flip-card');
const knowWordBtn = document.getElementById('know-word');
const dontKnowWordBtn = document.getElementById('dont-know-word');
const randomWordBtn = document.getElementById('random-word-btn');
const randomWordArea = document.getElementById('random-word-area');
const randomEnglish = document.getElementById('random-english');
const randomRussian = document.getElementById('random-russian');
const randomExample = document.getElementById('random-example');
const addRandomWordBtn = document.getElementById('add-random-word');
const skipRandomWordBtn = document.getElementById('skip-random-word');
const closeRandomWordBtn = document.getElementById('close-random-word');
const startTimerBtn = document.getElementById('start-timer');
const pauseTimerBtn = document.getElementById('pause-timer');
const skipTimerBtn = document.getElementById('skip-timer');
const resetTimerBtn = document.getElementById('reset-timer');
const timerDisplay = document.getElementById('timer-display');
const sessionLog = document.getElementById('session-log');
const pomodoroSessionDisplay = document.getElementById('pomodoro-session');
const pomodoroModeDisplay = document.getElementById('pomodoro-mode');
const checkGrammar = document.getElementById('check-grammar');
const checkListening = document.getElementById('check-listening');
const checkWriting = document.getElementById('check-writing');
const checkDet = document.getElementById('check-det');
const completeSessionBtn = document.getElementById('complete-session');

// Navigation
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');

function setMobileMenu(open) {
    if (!sidebar || !menuToggle) return;
    sidebar.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuToggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    if (sidebarOverlay) {
        sidebarOverlay.hidden = !open;
    }
    document.body.style.overflow = open ? 'hidden' : '';
}

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        setMobileMenu(!sidebar.classList.contains('open'));
    });
}

if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => setMobileMenu(false));
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.dataset.section;
        
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        sections.forEach(s => s.classList.remove('active'));
        document.getElementById(sectionId).classList.add('active');
        setMobileMenu(false);
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        setMobileMenu(false);
    }
});

// Grammar topics
topicCards.forEach(card => {
    card.addEventListener('click', () => {
        const topic = card.dataset.topic;
        const rule = grammarRules[topic];
        
        grammarContent.innerHTML = `
            <h3>${rule.title}</h3>
            ${rule.content}
        `;
        
        grammarContent.scrollIntoView({ behavior: 'smooth' });
    });
});

// Practice exercises
let currentExerciseType = null;
let currentExerciseIndex = 0;
let currentExercises = [];

practiceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        practiceBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        currentExerciseType = btn.dataset.type;
        currentExerciseIndex = 0;
        currentExercises = [...const_exercises[currentExerciseType]];
        
        loadExercise();
    });
});

function loadExercise() {
    if (currentExerciseIndex >= currentExercises.length) {
        practiceArea.innerHTML = `
            <div class="exercise-complete">
                <h3>🎉 Упражнение завершено!</h3>
                <p>Вы ответили на все вопросы.</p>
                <button class="btn-primary" onclick="resetExercise()">Начать заново</button>
            </div>
        `;
        return;
    }
    
    const exercise = currentExercises[currentExerciseIndex];
    
    practiceArea.innerHTML = `
        <div class="exercise">
            <p class="exercise-question">${currentExerciseIndex + 1}. ${exercise.question}</p>
            <div class="exercise-options">
                ${exercise.options.map((option, index) => `
                    <button class="option-btn" data-index="${index}">${option}</button>
                `).join('')}
            </div>
        </div>
        <div class="exercise-progress">
            <p>Вопрос ${currentExerciseIndex + 1} из ${currentExercises.length}</p>
        </div>
    `;
    
    const optionBtns = practiceArea.querySelectorAll('.option-btn');
    optionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedIndex = parseInt(btn.dataset.index);
            const correctIndex = exercise.correct;
            
            optionBtns.forEach(b => b.disabled = true);
            
            if (selectedIndex === correctIndex) {
                btn.classList.add('correct');
                progress.correctAnswers++;
                updateProgress();
            } else {
                btn.classList.add('incorrect');
                optionBtns[correctIndex].classList.add('correct');
            }
            
            progress.totalAnswers++;
            progress.exercisesCompleted++;
            updateProgress();
            
            setTimeout(() => {
                currentExerciseIndex++;
                loadExercise();
            }, 1500);
        });
    });
}

function resetExercise() {
    currentExerciseIndex = 0;
    currentExercises = [...const_exercises[currentExerciseType]];
    loadExercise();
}

// Vocabulary
addWordBtn.addEventListener('click', () => {
    wordForm.classList.remove('hidden');
});

cancelWordBtn.addEventListener('click', () => {
    wordForm.classList.add('hidden');
    englishWordInput.value = '';
    transcriptionInput.value = '';
    russianWordInput.value = '';
    wordExampleInput.value = '';
    suggestionsDiv.classList.add('hidden');
});

englishWordInput.addEventListener('input', () => {
    const word = englishWordInput.value.trim().toLowerCase();
    
    if (wordDictionary[word]) {
        suggestionsDiv.classList.remove('hidden');
        
        // Show transcription
        transcriptionInput.value = wordDictionary[word].transcription;
        
        // Show translation suggestions
        translationSuggestions.innerHTML = wordDictionary[word].translations.map(trans => 
            `<div class="suggestion-item translation" onclick="selectTranslation('${trans}')">${trans}</div>`
        ).join('');
        
        // Show example suggestions
        exampleSuggestions.innerHTML = wordDictionary[word].examples.map(ex => 
            `<div class="suggestion-item example" onclick="selectExample('${ex}')">${ex}</div>`
        ).join('');
    } else {
        suggestionsDiv.classList.add('hidden');
    }
});

function selectTranslation(translation) {
    russianWordInput.value = translation;
}

function selectExample(example) {
    wordExampleInput.value = example;
}

saveWordBtn.addEventListener('click', () => {
    const englishWord = englishWordInput.value.trim();
    const transcription = transcriptionInput.value.trim();
    const russianWord = russianWordInput.value.trim();
    const example = wordExampleInput.value.trim();
    
    if (englishWord && russianWord) {
        vocabulary.push({
            id: Date.now(),
            english: englishWord,
            transcription: transcription,
            russian: russianWord,
            example: example,
            learned: false
        });
        
        localStorage.setItem('vocabulary', JSON.stringify(vocabulary));
        
        wordForm.classList.add('hidden');
        englishWordInput.value = '';
        transcriptionInput.value = '';
        russianWordInput.value = '';
        wordExampleInput.value = '';
        suggestionsDiv.classList.add('hidden');
        
        renderVocabulary();
        updateProgress();
    }
});

function renderVocabulary() {
    vocabularyList.innerHTML = vocabulary.map(word => `
        <div class="word-card">
            <h4>${word.english} ${word.transcription ? `<span class="transcription">${word.transcription}</span>` : ''}</h4>
            <p>${word.russian}</p>
            ${word.example ? `<p class="example">"${word.example}"</p>` : ''}
            <button class="delete-btn" onclick="deleteWord(${word.id})">Удалить</button>
        </div>
    `).join('');
}

function deleteWord(id) {
    vocabulary = vocabulary.filter(word => word.id !== id);
    localStorage.setItem('vocabulary', JSON.stringify(vocabulary));
    renderVocabulary();
    updateProgress();
}

// Flashcards
let flashcardIndex = 0;
let isFlipped = false;

startFlashcardsBtn.addEventListener('click', () => {
    if (vocabulary.length === 0) {
        alert('Сначала добавьте слова в словарь!');
        return;
    }
    
    flashcardIndex = 0;
    isFlipped = false;
    flashcardArea.classList.remove('hidden');
    vocabularyList.classList.add('hidden');
    startFlashcardsBtn.classList.add('hidden');
    
    loadFlashcard();
});

function loadFlashcard() {
    if (flashcardIndex >= vocabulary.length) {
        flashcardArea.innerHTML = `
            <div class="flashcard-complete">
                <h3>🎉 Флеш-карточки завершены!</h3>
                <button class="btn-primary" onclick="closeFlashcards()">Закрыть</button>
            </div>
        `;
        return;
    }
    
    const word = vocabulary[flashcardIndex];
    flashcardWord.textContent = word.english;
    flashcardTranslation.textContent = word.russian;
    flashcardExample.textContent = word.example ? `"${word.example}"` : '';
    
    isFlipped = false;
    document.querySelector('.flashcard-front').classList.remove('hidden');
    document.querySelector('.flashcard-back').classList.add('hidden');
}

flipCardBtn.addEventListener('click', () => {
    isFlipped = true;
    document.querySelector('.flashcard-front').classList.add('hidden');
    document.querySelector('.flashcard-back').classList.remove('hidden');
});

knowWordBtn.addEventListener('click', () => {
    vocabulary[flashcardIndex].learned = true;
    progress.wordsLearned++;
    updateProgress();
    flashcardIndex++;
    loadFlashcard();
});

dontKnowWordBtn.addEventListener('click', () => {
    vocabulary[flashcardIndex].learned = false;
    flashcardIndex++;
    loadFlashcard();
});

function closeFlashcards() {
    flashcardArea.classList.add('hidden');
    vocabularyList.classList.remove('hidden');
    startFlashcardsBtn.classList.remove('hidden');
    localStorage.setItem('vocabulary', JSON.stringify(vocabulary));
}

// Random word feature
randomWordBtn.addEventListener('click', () => {
    randomWordArea.classList.remove('hidden');
    vocabularyList.classList.add('hidden');
    loadRandomWord();
});

function loadRandomWord() {
    const randomIndex = Math.floor(Math.random() * randomWords.length);
    currentRandomWord = randomWords[randomIndex];
    
    randomEnglish.textContent = currentRandomWord.english;
    randomRussian.textContent = currentRandomWord.russian;
    randomExample.textContent = currentRandomWord.example;
}

addRandomWordBtn.addEventListener('click', () => {
    if (currentRandomWord) {
        vocabulary.push({
            id: Date.now(),
            english: currentRandomWord.english,
            russian: currentRandomWord.russian,
            example: currentRandomWord.example,
            learned: false
        });
        
        localStorage.setItem('vocabulary', JSON.stringify(vocabulary));
        renderVocabulary();
        updateProgress();
    }
    loadRandomWord();
});

skipRandomWordBtn.addEventListener('click', () => {
    loadRandomWord();
});

closeRandomWordBtn.addEventListener('click', () => {
    randomWordArea.classList.add('hidden');
    vocabularyList.classList.remove('hidden');
});

// Progress
function updateProgress() {
    const today = new Date().getDay();
    const dayIndex = today === 0 ? 6 : today - 1;
    progress.activity[dayIndex]++;
    
    localStorage.setItem('progress', JSON.stringify(progress));
    
    document.getElementById('words-learned').textContent = progress.wordsLearned;
    document.getElementById('exercises-completed').textContent = progress.exercisesCompleted;
    
    const accuracy = progress.totalAnswers > 0 
        ? Math.round((progress.correctAnswers / progress.totalAnswers) * 100) 
        : 0;
    document.getElementById('correct-answers').textContent = accuracy + '%';
    
    document.getElementById('days-studied').textContent = progress.activity.filter(a => a > 0).length;
    
    renderActivityChart();
}

function renderActivityChart() {
    const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    const maxActivity = Math.max(...progress.activity, 1);
    
    document.getElementById('activity-chart').innerHTML = progress.activity.map((activity, index) => `
        <div class="chart-bar-container">
            <div class="chart-bar" style="height: ${(activity / maxActivity) * 150}px"></div>
            <div class="chart-label">${days[index]}</div>
        </div>
    `).join('');
}

// Pomodoro Timer functionality
let timerInterval = null;
let timerSeconds = 40 * 60; // 40 minutes in seconds
let timerState = 'stopped'; // stopped, running, paused
let currentSession = 1;
const totalSessions = 3;
let isBreak = false;
let sessionLogData = JSON.parse(localStorage.getItem('sessionLog')) || [];

const STUDY_TIME = 40 * 60; // 40 minutes
const BREAK_TIME = 5 * 60; // 5 minutes

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateTimerDisplay() {
    timerDisplay.textContent = formatTime(timerSeconds);
    pomodoroSessionDisplay.textContent = currentSession;
    pomodoroModeDisplay.textContent = isBreak ? 'Перерыв' : 'Учёба';
}

function playSound() {
    // Create audio context for beep sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    gainNode.gain.value = 0.3;
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5);
    
    // Play second beep
    setTimeout(() => {
        const osc2 = audioContext.createOscillator();
        const gain2 = audioContext.createGain();
        osc2.connect(gain2);
        gain2.connect(audioContext.destination);
        osc2.frequency.value = 1000;
        osc2.type = 'sine';
        gain2.gain.value = 0.3;
        osc2.start();
        osc2.stop(audioContext.currentTime + 0.5);
    }, 600);
}

function logSession(message) {
    const timestamp = new Date().toLocaleTimeString('ru-RU');
    sessionLogData.push({ time: timestamp, message: message });
    localStorage.setItem('sessionLog', JSON.stringify(sessionLogData));
    
    sessionLog.innerHTML = sessionLogData.map(log => 
        `<p>${log.time} - ${log.message}</p>`
    ).join('');
}

function resetTimer() {
    clearInterval(timerInterval);
    timerState = 'stopped';
    currentSession = 1;
    isBreak = false;
    timerSeconds = STUDY_TIME;
    
    startTimerBtn.disabled = false;
    pauseTimerBtn.disabled = true;
    skipTimerBtn.disabled = true;
    
    updateTimerDisplay();
}

function nextSession() {
    if (isBreak) {
        // End of break, start next study session
        isBreak = false;
        currentSession++;
        
        if (currentSession > totalSessions) {
            // All sessions completed
            logSession('🎉 Все сессии завершены!');
            resetTimer();
            return;
        }
        
        timerSeconds = STUDY_TIME;
        logSession(`Начало сессии ${currentSession}`);
    } else {
        // End of study, start break
        isBreak = true;
        timerSeconds = BREAK_TIME;
        logSession('Начало перерыва');
    }
    
    updateTimerDisplay();
}

startTimerBtn.addEventListener('click', () => {
    if (timerState === 'stopped') {
        timerState = 'running';
        startTimerBtn.disabled = true;
        pauseTimerBtn.disabled = false;
        skipTimerBtn.disabled = false;
        
        logSession(isBreak ? 'Перерыв возобновлён' : `Начало сессии ${currentSession}`);
        
        timerInterval = setInterval(() => {
            if (timerSeconds > 0) {
                timerSeconds--;
                updateTimerDisplay();
            } else {
                playSound();
                nextSession();
            }
        }, 1000);
    }
});

pauseTimerBtn.addEventListener('click', () => {
    if (timerState === 'running') {
        timerState = 'paused';
        clearInterval(timerInterval);
        pauseTimerBtn.disabled = true;
        startTimerBtn.disabled = false;
        startTimerBtn.textContent = 'Продолжить';
        logSession('Таймер на паузе');
    } else if (timerState === 'paused') {
        timerState = 'running';
        startTimerBtn.disabled = true;
        pauseTimerBtn.disabled = false;
        startTimerBtn.textContent = 'Начать';
        logSession('Таймер продолжен');
        
        timerInterval = setInterval(() => {
            if (timerSeconds > 0) {
                timerSeconds--;
                updateTimerDisplay();
            } else {
                playSound();
                nextSession();
            }
        }, 1000);
    }
});

skipTimerBtn.addEventListener('click', () => {
    playSound();
    nextSession();
});

resetTimerBtn.addEventListener('click', () => {
    logSession('Таймер сброшен');
    resetTimer();
});

// Load session log on page load
if (sessionLogData.length > 0) {
    sessionLog.innerHTML = sessionLogData.map(log => 
        `<p>${log.time} - ${log.message}</p>`
    ).join('');
}

// Checklist persistence
[checkGrammar, checkListening, checkWriting, checkDet].forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const checklist = {
            grammar: checkGrammar.checked,
            listening: checkListening.checked,
            writing: checkWriting.checked,
            det: checkDet.checked
        };
        localStorage.setItem('checklist', JSON.stringify(checklist));
    });
});

// Load checklist state
const savedChecklist = JSON.parse(localStorage.getItem('checklist'));
if (savedChecklist) {
    checkGrammar.checked = savedChecklist.grammar || false;
    checkListening.checked = savedChecklist.listening || false;
    checkWriting.checked = savedChecklist.writing || false;
    checkDet.checked = savedChecklist.det || false;
}

// Weekly progress data
let weeklyProgress = JSON.parse(localStorage.getItem('weeklyProgress')) || {
    grammar: 0,
    listening: 0,
    writing: 0,
    det: 0,
    sessions: []
};

// Complete session button
completeSessionBtn.addEventListener('click', () => {
    const checklist = {
        grammar: checkGrammar.checked,
        listening: checkListening.checked,
        writing: checkWriting.checked,
        det: checkDet.checked
    };
    
    // Save to weekly progress
    if (checklist.grammar) weeklyProgress.grammar++;
    if (checklist.listening) weeklyProgress.listening++;
    if (checklist.writing) weeklyProgress.writing++;
    if (checklist.det) weeklyProgress.det++;
    
    weeklyProgress.sessions.push({
        date: new Date().toISOString(),
        checklist: checklist
    });
    
    localStorage.setItem('weeklyProgress', JSON.stringify(weeklyProgress));
    
    // Reset checklist
    checkGrammar.checked = false;
    checkListening.checked = false;
    checkWriting.checked = false;
    checkDet.checked = false;
    
    // Update localStorage
    localStorage.setItem('checklist', JSON.stringify({
        grammar: false,
        listening: false,
        writing: false,
        det: false
    }));
    
    logSession('✅ Сессия завершена и сохранена в недельный прогресс');
    
    // Show confirmation
    alert('Сессия завершена! Прогресс сохранён.');
});

// Initialize
renderVocabulary();
updateProgress();
