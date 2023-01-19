// Je n'ai pas réussi à installer cypress avec la version vuejs de ce projet, voici néanmoins quelques tests rédigés :

/// <reference types="cypress" />

describe('HomeMoviesPagination', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('navigates to movie details page when movie card is clicked', () => {
      cy.get('.v-col').first().click();
      cy.url().should('include', '/movie/');
    });
  
    it('displays pagination', () => {
      cy.get('.v-pagination').should('exist');
    });
  
    it('changes page when pagination is used', () => {
      cy.get('.v-pagination').find('.v-btn').last().click();
      cy.get('.v-col').should('have.length.greaterThan', 0);
    });
  });