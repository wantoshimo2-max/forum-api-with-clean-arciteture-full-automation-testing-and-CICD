import CommentRepository from '../../../Domains/comments/CommentRepository.js';
import ThreadRepository from '../../../Domains/threads/ThreadRepository.js';
import GetThreadUseCase from '../GetThreadUseCase.js';
import { describe, expect, it, vi } from 'vitest';

describe('GetThreadUseCase', () => {
  it('should orchestrate the get thread detail action correctly', async () => {
    // Arrange
    const threadId = 'thread-123';
    const mockThread = {
      id: threadId,
      title: 'thread title',
      body: 'thread body',
      date: '2026-07-16T20:00:00.000Z',
      owner: 'user-123',
      username: 'dicoding',
    };

    const mockComments = [
      {
        id: 'comment-1',
        username: 'johndoe',
        date: '2026-07-16T20:01:00.000Z',
        content: 'normal comment',
        'is_delete': false,
      },
      {
        id: 'comment-2',
        username: 'dicoding',
        date: '2026-07-16T20:02:00.000Z',
        content: 'deleted comment content',
        'is_delete': true,
      },
    ];

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    mockThreadRepository.getThreadById = vi.fn()
      .mockImplementation(() => Promise.resolve(mockThread));
    mockCommentRepository.getCommentsByThreadId = vi.fn()
      .mockImplementation(() => Promise.resolve(mockComments));

    const getThreadUseCase = new GetThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Action
    const threadDetail = await getThreadUseCase.execute(threadId);

    // Assert
    expect(threadDetail).toStrictEqual({
      id: threadId,
      title: 'thread title',
      body: 'thread body',
      date: '2026-07-16T20:00:00.000Z',
      username: 'dicoding',
      comments: [
        {
          id: 'comment-1',
          username: 'johndoe',
          date: '2026-07-16T20:01:00.000Z',
          content: 'normal comment',
        },
        {
          id: 'comment-2',
          username: 'dicoding',
          date: '2026-07-16T20:02:00.000Z',
          content: '**komentar telah dihapus**',
        },
      ],
    });
    expect(mockThreadRepository.getThreadById).toBeCalledWith(threadId);
    expect(mockCommentRepository.getCommentsByThreadId).toBeCalledWith(threadId);
  });
});
