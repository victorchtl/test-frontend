// Je n'ai pas réussi à installer cypress avec la version vuejs de ce projet, voici néanmoins quelques tests rédigés :

/// <reference types="cypress" />

describe('Movie Details page', () => {
    beforeEach(() => {
        cy.visit('/movie/1');
    });

    it('displays the movie title', () => {
        cy.get('.text-h4').should('contain', 'Movie Title');
    });

    it('displays the movie rating', () => {
        cy.get('.v-rating').should('exist');
    });

    it('displays the movie description', () => {
        cy.get('.text-body-2').should('contain', 'Movie Description');
    });

    it('displays the movie actors', () => {
        cy.get('.ActorCard').should('exist');
    });

    it('opens the movie actors dialog', () => {
        cy.get('[icon="mdi-account-multiple"]').click();
        cy.get('.v-dialog').should('exist');
    });
});