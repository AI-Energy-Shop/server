export const typeDefs = `
	union DataUnion = UsersPermissionsUser | Page | UserNotification

	type DeleteResponse {
		documentId: ID
	}

	type Response {
		error: String
		data: DataUnion
		success: Boolean
		statusText: String
	}
	input CartFiltersInput {
		documentId: IDFilterInput
		item: CartItemFiltersInput
		and: [ProductFiltersInput]
		or: [ProductFiltersInput]
		not: ProductFiltersInput
	}

	input CartItemFiltersInput {
		id: IDFilterInput
		title: StringFilterInput
		quantity: IntFilterInput
		price: FloatFilterInput
		odoo_product_id: StringFilterInput
		model: StringFilterInput
		image: StringFilterInput
	}

	input CartItemInput {
		title: String!
		quantity: Int!
		price: Float!
		odoo_product_id: String!
		model: String!
		image: String!
	}

	type Cart {
		documentId: ID!
		item: ComponentElementsCartItem!
		user: UsersPermissionsUser
		createdAt: DateTime
		updatedAt: DateTime
		publishedAt: DateTime
	}

	input RegisterUserInput {
		email: String!
		username: String!
		password: String!
		businessName: String!
		businessNumber: String!
		userType: String!
		phone: String!
		street1: String!
		street2: String!
		state: String!
		city: String!
		country: String!
		zipCode: String!
	}

	input ApprovedUserInput {
		userType: String!
		userLevel: String!
		accountStatus: String!
		odooUserId: String!
	}

	input UserAccountDetails {
		odooId: String!
		userPricingLevel: String
	}

	input UserApprovalRequestInputArgs {
		email: String!
		accountStatus: String!
		user: UserAccountDetails
	}

	input FilesFiltersArgs {
		name: String
		mimeTypes: [String]
	}

	input UserFiltersInput {
		email: String
		username: String
	}

	type Mutation {
		addToCart(data: CartItemInput!): Cart
		updateCartItem(documentId: ID!, data: CartItemInput!): Cart
		deleteCartItem(documentId: ID!): DeleteResponse
		updateCart(documentId: ID!, data: CartItemInput!): Cart
		registerUser(data: RegisterUserInput!): UsersPermissionsUser
		customProductUpdate(documentId: ID!, data: ProductInput!): Product
		approvedUser(documentId: ID!, data: ApprovedUserInput!): UsersPermissionsUser
		updateUser(documentId: ID!, data: UsersPermissionsUserInput!): UsersPermissionsUser
	}
	
	type Query {
		cart(documentId: ID!): Cart
		carts(filters: CartFiltersInput, pagination: PaginationArg = {}, sort: [String] = []): [Cart]
		getPage(slug: String!): Page
		files(filters: FilesFiltersArgs): [UploadFile]!
		user(filters: UserFiltersInput): UsersPermissionsUser
	}
`;
