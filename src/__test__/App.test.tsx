import { render, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';
import { Details } from '../components/Details';

describe('App Router', () => {
    beforeEach(() => {
        jest.spyOn(axios, 'get').mockResolvedValue({
            data: { hits: 0 },
        });
    });

    test('should render Post Component with path "/"', async () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByText('All blog posts')).toBeInTheDocument();
        await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    });

    test('should render Details component with path "details/id"', async () => {
        render(
            <MemoryRouter initialEntries={['details/1']}>
                <Details />
            </MemoryRouter>
        );

        // const detailsElement = screen.getByTestId('details-test-id');
        // expect(detailsElement).toBeInTheDocument();

        // expect(await screen.findByTestId('details', {}, { timeout: 500 || 1000 })).toBeInTheDocument();
        await expect(screen.getByTestId('details-test-id')).toBeInTheDocument();
        // expect(await screen.findByTestId('details-test-id')).toBeInTheDocument();
    });

    // test('should render News details page with news id', async () => {
    //     renderWithMemoryRouter('/details/1', <App />);

    //     await elementFinder('details');
    // });

    // test('should render NotFound page on invalid route', async () => {
    //     renderWithMemoryRouter('/invalid', <App />);

    //     await textFinderRx('404');
    // });
});
