import Cypress from 'cypress';

const TEST_URL = 'http://localhost:4000';

const BUN = { _id: "643d69a5c3f7b9001cfa093c", name: "Краторная булка N-200i" };

const INGREDIENTS = [
    { _id: "643d69a5c3f7b9001cfa0943", name: "Соус фирменный Space Sauce" },
    { _id: "643d69a5c3f7b9001cfa0946", name: "Хрустящие минеральные кольца" },
    { _id: "643d69a5c3f7b9001cfa093e", name: "Филе Люминесцентного тетраодонтимформа" },
    { _id: "643d69a5c3f7b9001cfa0943", name: "Соус фирменный Space Sauce" },
];

const ONE_INGREDIENT = {
    "_id": "643d69a5c3f7b9001cfa093f",
    "name": "Мясо бессмертных моллюсков Protostomia",
    "type": "main",
    "proteins": 433,
    "fat": 244,
    "carbohydrates": 33,
    "calories": 420,
    "price": 1337,
    "image": "https://code.s3.yandex.net/react/code/meat-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-02-large.png",
    "__v": 0
};

const ORDER = {
    price: 3958,
    number: 48436
};

const ORDER_BUTTON_TEXT = 'Оформить заказ';

/*
Созданы моковые данные 
для ингредиентов - ingredients.json
на запрос данных пользователя - user.json
на запрос создания заказа - order.json
*/

const clickSomeIngredients = () => {
    cy.get(`[data-cy = ${BUN._id}]`).children('button').click();
    INGREDIENTS.forEach(({ _id }) => {
        cy.get(`[data-cy = ${_id}]`).children('button').click();
    })
};

describe('Интеграционные тесты на Cypress для страницы конструктора бургера', function () {
    beforeEach(() => {
        cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients'); //Настроен перехват запроса на эндпоинт 'api/ingredients’, в ответе на который возвращаются созданные ранее моковые данные.
    })

    it(`0. сервис должен быть доступен по адресу ${TEST_URL}`, function () {
        cy.visit(TEST_URL);
    });

    describe('1. Протестировано добавление ингредиента из списка в конструктор', () => {

        beforeEach(() => {
            cy.visit(TEST_URL);
        })

        it('1/1. добавление булок', () => {
            cy.get(`[data-cy = ${BUN._id}]`).children('button').click();
        });

        it('1/2. добавление одной начинки', () => {
            cy.get(`[data-cy = ${INGREDIENTS[0]._id}]`).children('button').click();
        });

        it('1/3. добавление булок и нескольких начинок', () => {
            clickSomeIngredients();
        });

    });

    describe('2. Протестирована работа модальных окон', () => {

        beforeEach(() => {
            cy.visit(TEST_URL);
            cy.get(`[data-cy = ${ONE_INGREDIENT._id}]`).click();
        })

        it('2/1. открытие модального окна ингредиента', () => {
            cy.contains('#modals', ONE_INGREDIENT.name).should('exist');
        });

        it('2/2. закрытие по клику на крестик', () => {
            cy.get('#modals button').click();
            cy.contains('#modals', ONE_INGREDIENT.name).should('not.exist');
        });

        it('2/3. закрытие по клику на оверлей', () => {
            cy.get(`[data-cy = 'overlay']`).click({ force: true }); //element is being covered by another element. Fix this problem, or use {force: true} to disable error checking.
            cy.contains('#modals', ONE_INGREDIENT.name).should('not.exist');
        });

    });

    describe('3. Создание заказа', () => {

        beforeEach(() => {
            cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('user');
            cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('order');

            cy.setCookie('accessToken', 'test-accessToken');
            window.localStorage.setItem('refreshToken', 'test-refreshToken');

            cy.visit(TEST_URL);

            clickSomeIngredients();
        })

        afterEach(() => {
            cy.clearCookie('accessToken');
            cy.clearLocalStorage('refreshToken');
        })

        it('3/1. Собирается бургер - выбранные ингридиенты отображаются в бургере', () => {
            cy.contains(`[data-cy='burger_constructor']`, BUN.name + " (верх)").should('exist');
            cy.contains(`[data-cy='burger_constructor']`, BUN.name + " (низ)").should('exist');
            INGREDIENTS.forEach(({ name }) => {
                cy.contains(`[data-cy='burger_constructor']`, name).should('exist');
            })
            cy.contains(`[data-cy='burger_constructor']`, ORDER.price).should('exist');
        });

        it(`3/2. Вызывается клик по кнопке «${ORDER_BUTTON_TEXT}»`, () => {
            cy.get(`[data-cy="burger_constructor"] button:contains(${ORDER_BUTTON_TEXT})`).click();
        });

        it(`3/3. Проверяется, что модальное окно открылось и номер заказа верный (${ORDER.number})`, () => {
            cy.get(`[data-cy="burger_constructor"] button:contains(${ORDER_BUTTON_TEXT})`).click();
            cy.contains('#modals', ORDER.number).should('exist');
        });

        it('3/4. Закрывается модальное окно и проверяется успешность закрытия', () => {
            cy.get(`[data-cy="burger_constructor"] button:contains(${ORDER_BUTTON_TEXT})`).click();
            cy.get('#modals button').click();
            cy.contains('#modals', ORDER.number).should('not.exist');
        });

        it('3/5. Проверяется, что конструктор пуст', () => {
            cy.get(`[data-cy="burger_constructor"] button:contains(${ORDER_BUTTON_TEXT})`).click();
            cy.get('#modals button').click();
            cy.contains(`[data-cy='burger_constructor']`, 'Выберите булки').should('exist');
            cy.contains(`[data-cy='burger_constructor']`, 'Выберите начинку').should('exist');
        });
        
    });

});

