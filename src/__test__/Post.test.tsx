import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { Post } from '../components/Post';

describe('Test the Post component', () => {
    beforeEach(() => {
        jest.spyOn(axios, 'get').mockResolvedValue({
            data: {
                hits: [
                    {
                        created_at: '2022-02-12T12:10:12.000Z',
                        title: 'Can GPT-3 AI write comedy?',
                        url: 'https://robmanuelfuckyeah.substack.com/p/someone-needs-to-stop-me-playing',
                        author: 'rossvor',
                        created_at_i: 1644667812,
                        objectID: '30312182',
                    },
                ],
            },
        });
    });

    test('should render post list', async () => {
        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {
            render(
                <MemoryRouter>
                    <Post />
                </MemoryRouter>
            );
        });
        const postList = screen.getByTestId('post-list');
        await expect(postList).toBeInTheDocument();
    });

    test('should render posts details when click row', async () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );
        userEvent.click(await screen.findByText('Can GPT-3 AI write comedy?'), {
            button: 0,
        });
        expect(
            await screen.findByTestId('details-test-id')
        ).toBeInTheDocument();
    });

    test('should check if pagination is exists', async () => {
        render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        );
        expect(await screen.findByTestId('pagination')).toBeInTheDocument();
    });
});
