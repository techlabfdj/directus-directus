import type { DirectusComment } from '../../../schema/comment.js';
import type { ApplyQueryFields, Query } from '../../../types/index.js';
import type { RestCommand } from '../../types.js';
import { throwIfEmpty } from '../../utils/index.js';

export type UpdateCommentOutput<
	Schema,
	TQuery extends Query<Schema, Item>,
	Item extends object = DirectusComment<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery['fields']>;

/**
 * Update multiple existing comments.
 * @param keys
 * @param item
 * @param query
 * @returns Returns the comment objects for the updated comments.
 * @throws Will throw if keys is empty
 */
export const updateComments =
	<Schema, const TQuery extends Query<Schema, DirectusComment<Schema>>>(
		keys: DirectusComment<Schema>['id'][],
		item: Partial<DirectusComment<Schema>>,
		query?: TQuery,
	): RestCommand<UpdateCommentOutput<Schema, TQuery>[], Schema> =>
	() => {
		throwIfEmpty(keys, 'Keys cannot be empty');

		return {
			path: `/comments`,
			params: query ?? {},
			body: JSON.stringify({ keys, data: item }),
			method: 'PATCH',
		};
	};

/**
 * Update an existing comment.
 * @param key
 * @param item
 * @param query
 * @returns Returns the comment object for the updated comment.
 * @throws Will throw if key is empty
 */
export const updateComment =
	<Schema, const TQuery extends Query<Schema, DirectusComment<Schema>>>(
		key: DirectusComment<Schema>['id'],
		item: Partial<DirectusComment<Schema>>,
		query?: TQuery,
	): RestCommand<UpdateCommentOutput<Schema, TQuery>, Schema> =>
	() => {
		throwIfEmpty(String(key), 'Key cannot be empty');

		return {
			path: `/comments/${key}`,
			params: query ?? {},
			body: JSON.stringify(item),
			method: 'PATCH',
		};
	};