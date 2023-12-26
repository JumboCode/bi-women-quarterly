/**
 * Skeleton for ProfileReview component. Includes descriptions of state, views, etc.
 * @author Austen Money
 */

// Import React
import React, { useReducer, useEffect } from 'react';

// Import Clerk Auth
import { useUser } from "@clerk/nextjs";

/*------------------------------------------------------------------------*/
/* -------------------------------- Types ------------------------------- */
/*------------------------------------------------------------------------*/

// Type containing info about the user specific to this page
type UserInfo = {
	// (fill in with the rest of the user info variables)
	profilePicture: string | null;
	email: string | null,
	firstName: string,
	lastName: string,
	// (....etc)
};

/*------------------------------------------------------------------------*/
/* -------------------------------- State ------------------------------- */
/*------------------------------------------------------------------------*/

/* -------- State Definition -------- */

type State = {
	// Whether the page is in edit mode
	inEditMode: boolean;
	// Info about the current user
	currentUserInfo?: UserInfo;
};

/* ------------- Actions ------------ */

// Types of actions
enum ActionType {
	// Turn edit mode on/off
	ToggleEditMode = 'ToggleEditMode',
	// Update user info
	UpdateUser = 'UpdateUser',
}

// Action definitions
type Action = (
	| {
		// Action type
		type: ActionType.UpdateUser,
		// Updated user info 
		updatedUserInfo: UserInfo,
	}
	| {
		// Action type
		type: ActionType.ToggleEditMode,
	}
);

/**
 * Reducer that executes actions
 * @author Add Your Name
 * @param state current state
 * @param action action to execute
 * @returns updated state
 */
const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case ActionType.ToggleEditMode: {
			return {
				...state,
				inEditMode: !state.inEditMode,
			};
		}
		case ActionType.UpdateUser: {
			return {
				...state,
				currentUserInfo: action.updatedUserInfo,
			};
		}
		default: {
			return state;
		}
	}
};

/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/

const ProfileReview: React.FC<{}> = () => {
	/*------------------------------------------------------------------------*/
	/* -------------------------------- Setup ------------------------------- */
	/*------------------------------------------------------------------------*/

	/* -------------- State ------------- */

	// Initial state
	const initialState: State = {
		inEditMode: false,
	};

	// Initialize state
	const [state, dispatch] = useReducer(reducer, initialState);

	// Destructure common state
	const {
		inEditMode,
		currentUserInfo,
	} = state;

	/*------------------------------------------------------------------------*/
	/* ------------------------- Lifecycle Functions ------------------------ */
	/*------------------------------------------------------------------------*/

	/**
	 * Mount
	 * @author Add your name here
	 */
	useEffect(
		() => {
			(async () => {
				// This function is a specialized function that will only be called once,
				// when the component first renders. 
				// 
				// This is where you'll first set the user info. The same
				// stuff you're already doing to pull the user info into 
				// your state will happen in this function instead, so that
				// you're only doing it once (you're essentially caching the 
				// data you get from Clerk in your state). 
				//
				// Any edits to the state will not be pushed to the Clerk database
				// unless the user clicks "submit", and no new info will be pulled from
				// the Clerk database after this one function is called. (We know what
				// the state looks like at the beginning of the component's lifecycle,
				// and we control anything that might change.)

			})();
			const { user } = useUser();
			dispatch({
				type: ActionType.UpdateUser,
				updatedUserInfo: // add the user info here
      })
		},
		[],
	);

	/*------------------------------------------------------------------------*/
	/* ------------------------------- Render ------------------------------- */
	/*------------------------------------------------------------------------*/

	/*----------------------------------------*/
	/* ---------------- Views --------------- */
	/*----------------------------------------*/

	// Body that will be filled with the current view
	let body: React.ReactNode;

	/* -------- Edit Mode -------- */

	if (inEditMode) {
		// TODO: implement

		// Create body
		body = (
			<addJSXOfBody />
		);
	}

	/* -------- Preview mode -------- */

	else {
		// TODO: implement

		// Create body
		body = (
			<addJSXOfBody />
		);
	}

	/*----------------------------------------*/
	/* --------------- Main UI -------------- */
	/*----------------------------------------*/

	return (
		<addContainersForBody>
			{/* Add Body */}
			{body}
		</addContainersForBody>
	);
};

/*------------------------------------------------------------------------*/
/* ------------------------------- Wrap Up ------------------------------ */
/*------------------------------------------------------------------------*/

// Export component
export default ProfileReview;