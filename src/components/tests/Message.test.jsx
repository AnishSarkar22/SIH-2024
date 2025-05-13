import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { collection, query, where, onSnapshot, doc, getDoc } from 'firebase/firestore';
import Message from '../Message';

// Mock Firebase
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  onSnapshot: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
}));

// Mock components
jest.mock('./Sidebar', () => {
  return function DummySidebar(props) {
    return <div data-testid="sidebar">Sidebar</div>;
  };
});

jest.mock('./Header', () => {
  return function DummyHeader(props) {
    return <div data-testid="header">Header</div>;
  };
});

const mockChats = [
  {
    id: '1',
    chat_id: '1',
    mentor_id: 'mentor1',
    mentee_id: 'mentee1',
    status: 'booked',
    created_at: '2023-01-01',
  },
];

const mockUserData = {
  name: 'John Doe',
};

const mockChatData = {
  last_message: {
    content: 'Hello',
    timestamp: '2023-01-01',
  },
};

describe('Message Component', () => {
  beforeEach(() => {
    // Setup localStorage mock
    Storage.prototype.getItem = jest.fn((key) => {
      if (key === 'darkMode') return 'disabled';
      if (key === 'userId') return 'user123';
      if (key === 'userType') return 'mentee';
      return null;
    });
    Storage.prototype.setItem = jest.fn();

    // Setup Firebase mocks
    query.mockReturnValue({});
    onSnapshot.mockImplementation((query, callback) => {
      callback({
        docs: mockChats.map(chat => ({
          data: () => chat,
        })),
      });
      return () => {};
    });
    doc.mockReturnValue({});
    getDoc.mockImplementation(() => Promise.resolve({
      data: () => ({ ...mockUserData, ...mockChatData }),
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders Message component', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Message />
        </BrowserRouter>
      );
    });

    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByText('Personal Assistant')).toBeInTheDocument();
  });

  test('toggles dark mode', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Message />
        </BrowserRouter>
      );
    });

    const container = screen.getByTestId('header');
    fireEvent.click(container); // Simulate dark mode toggle

    expect(localStorage.setItem).toHaveBeenCalledWith('darkMode', 'enabled');
  });

  test('displays chat list correctly', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Message />
        </BrowserRouter>
      );
    });

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  test('generates correct initials', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Message />
        </BrowserRouter>
      );
    });

    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  test('chat button navigates correctly', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Message />
        </BrowserRouter>
      );
    });

    const messageButton = screen.getByText('Message');
    expect(messageButton.closest('a')).toHaveAttribute('href', '/chat/1');
  });

  test('AI chat button navigates correctly', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Message />
        </BrowserRouter>
      );
    });

    const aiChatButton = screen.getByText('Chat');
    expect(aiChatButton.closest('a')).toHaveAttribute('href', '/personal-ai');
  });
});