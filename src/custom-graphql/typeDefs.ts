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
		userType: String!
		email: String!
		username: String!
		password: String!
		businessName: String!
		businessNumber: String!
		street: String!
		suburb: String!
		state: String!
		postalCode: String!
		phone: String!
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
		getProduct(documentId: ID!, status: PublicationStatus = PUBLISHED): Product
		getProducts(filters: ProductFiltersInput, pagination: PaginationArg = {}, sort: [String] = [], status: PublicationStatus = PUBLISHED): [Product]!
		user(filters: UserFiltersInput): UsersPermissionsUser
	}
`;
