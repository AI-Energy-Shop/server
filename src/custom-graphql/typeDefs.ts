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

	input RegisterUserInput {
		email: String!
		username: String!
		password: String!
		businessName: String!
		businessNumber: String!
		businessType: String!
		phone: String!
		street1: String!
		street2: String!
		state: String!
		city: String!
		country: String!
		zipCode: String!
	}

	input ApprovedUserInput {
		businessType: String!
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
		registerUser(data: RegisterUserInput!): UsersPermissionsUser
		customProductCreate(data: ProductInput!): Product
		customProductUpdate(documentId: ID!, data: ProductInput!): Product
		approvedUser(documentId: ID!, data: ApprovedUserInput!): UsersPermissionsUser
		updateUser(documentId: ID!, data: UsersPermissionsUserInput!): UsersPermissionsUser
	}
	
	type Query {
		getStoreProduct(handle: String!): Product
		getPage(slug: String!): Page
		files(filters: UploadFileFiltersInput): [UploadFile]!
		user(filters: UserFiltersInput): UsersPermissionsUser
	}
`;
