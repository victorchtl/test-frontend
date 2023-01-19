// Je n'ai pas réussi à installer vue-jest avec la version vuejs de ce projet, voici néanmoins quelques tests rédigés :

import { shallowMount } from '@vue/test-utils'
import MovieDetails from '@/components/MovieDetails.vue'
import MovieRatingDialog from '@/components/shared/MovieRatingDialog.vue'
import MovieActorsDialog from '@/components/shared/MovieActorsDialog.vue'
import ActorCard from '@/components/shared/ActorCard.vue'

describe('MovieDetails.vue', () => {
    let wrapper
    const movieDetails = {
        title: 'Example Movie',
        description: 'Example description',
        rating: 3.5,
        actors: [
            { id: 1, first_name: 'John', last_name: 'Doe' },
            { id: 2, first_name: 'Jane', last_name: 'Smith' }
        ]
    }

    beforeEach(() => {
        wrapper = shallowMount(MovieDetails, {
            propsData: { movieDetails }
        })
    })

    it('renders title and description', () => {
        expect(wrapper.find('.text-h4').text()).toBe(movieDetails.title)
        expect(wrapper.find('.text-body-2').text()).toBe(movieDetails.description)
    })

    it('shows the rating dialog when "Add Rating" button is clicked', () => {
        expect(wrapper.find(MovieRatingDialog).exists()).toBe(false)
        wrapper.find('[data-testid="add-rating-button"]').trigger('click')
        expect(wrapper.find(MovieRatingDialog).exists()).toBe(true)
    })

    it('shows movie description text area when "Edit Description" button is clicked', () => {
        expect(wrapper.find('[data-testid="description-edit-form"]').exists()).toBe(false)
        wrapper.find('[data-testid="edit-description-button"]').trigger('click')
        expect(wrapper.find('[data-testid="description-edit-form"]').exists()).toBe(true)
    })

    it('shows movie actors dialog when "View Actors" button is clicked', () => {
        expect(wrapper.find(MovieActorsDialog).exists()).toBe(false)
        wrapper.find('[data-testid="view-actors-button"]').trigger('click')
        expect(wrapper.find(MovieActorsDialog).exists()).toBe(true)
    })

    it('renders an actor card for each actor in the movie', () => {
        expect(wrapper.findAll(ActorCard).length).toBe(2)
    })
})