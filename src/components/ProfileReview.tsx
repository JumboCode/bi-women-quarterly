/**
 * Profile review React component.
 * @author Lucien Bao, Lydia Chen, Austen Money
 */

// Clerk imports
import { useUser } from "@clerk/nextjs";

// React imports
import React, { useReducer, useEffect, useRef } from 'react';

// Custom types, etc.
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

import RaceEthnicity from "@/types/RaceEthnicity";
import Gender from "@/types/Gender";
import SocialMedias from "@/types/SocialMedias";

/*------------------------------------------------------------------------*/
/* -------------------------------- State ------------------------------- */
/*------------------------------------------------------------------------*/

/* -------- State Definition -------- */

type State = {
    // Preview vs. edit mode
    view: View;
    // Info about the current user
    userInfo?: UserInfo;
};

/* ----------- View Definition ------------- */

enum View {
    Preview = "PreviewView",
    Edit = "EditView"
}

/* -------- User Info Definition -------- */

type UserInfo = {
    profilePicture?: string;
    email: string, // required
    firstName?: string,
    lastName?: string,
    authorName: string, // required
    pronouns?: string,
    bio: string,  // required
    birthday?: Date,
    raceEthnicity?: RaceEthnicity,
    gender?: Gender,
    country?: string,
    stateProvince?: string,
    cityTown?: string,

    // NOTE: for socialMedias to be optional means that the
    // strings it contains are allowed to be empty
    socialMedias: SocialMedias
};

/* ------------- Actions ------------ */

// Types of actions
enum ActionType {
    ToggleView = "ToggleView",
    UpdateUserInfo = "UpdateUserInfo"
}

// Action definitions
type Action = (
    | {
        type: ActionType.ToggleView,
    }
    | {
        type: ActionType.UpdateUserInfo,
        updatedUserInfo: UserInfo
    }
)

/**
 * Reducer that executes actions
 * @author Lucien Bao, Austen Money
 * @param state current state
 * @param action action to execute
 * @returns updated state
 */
const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionType.ToggleView: {
            return {
                ...state,
                view: state.view == View.Preview ?
                    View.Edit : View.Preview,
            };
        }
        case ActionType.UpdateUserInfo: {
            return {
                ...state,
                userInfo: action.updatedUserInfo,
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

    // Get current user; requires a user so if there isn't one then stop
    const { user } = useUser();
    // if (!user)
    //     return (<div>No user found!</div>);
    const currentUser = user ?? {
        unsafeMetadata: {
            profilePicture: "dummy.png",
            email: "alexandra_orange@test.com",
            firstName: "Alexandra",
            lastName: "Orange",
            authorName: "capybaraOrange",
            pronouns: "they/them",
            bio: "#ART #AMAZINGBIO",
            birthday: new Date('1990-01-01'),
            raceEthnicity: "Asian" as RaceEthnicity,
            gender: "Non-binary" as Gender,
            country: "United States",
            stateProvince: "California",
            cityTown: "Los Angeles",
            socialMedias: {
              LinkedIn: "@alexandra_linkedin",
              Facebook: "@alexandra_facebook",
              Instagram: "@alexandra_instagram",
              X: "@alexandra_twitter",
              TikTok: "@alexandra_tiktok",
            },
        },
      };

    const userProps = currentUser.unsafeMetadata;

    const initialState: State = {
        view: View.Preview,
        userInfo: {
          profilePicture: userProps.profilePicture as string || '',
          email: userProps?.primaryEmailAddressId || '',
          firstName: userProps?.firstName || '',
          lastName: userProps?.lastName || '',
          authorName: userProps.authorName as string || '',
          pronouns: userProps.pronouns as string || '',
          bio: userProps.bio as string || '',
          birthday: userProps.birthday as Date || new Date(),
          raceEthnicity: userProps.raceEthnicity as RaceEthnicity || '',
          gender: userProps.gender as Gender || '',
          country: userProps.country as string || '',
          stateProvince: userProps.stateProvince as string || '',
          cityTown: userProps.cityTown as string || '',
          socialMedias: userProps.socialMedias as SocialMedias || {
            LinkedIn: '',
            Facebook: '',
            Instagram: '',
            X: '',
            TikTok: '',
          },
        },
      };

    const [state, dispatch] = useReducer(reducer, initialState);

    const {
        view,
        userInfo
    } = state;

    /*------------------------------------------------------------------------*/
    /* ------------------------- Lifecycle Functions ------------------------ */
    /*------------------------------------------------------------------------*/

    /**
     * Mount
     * @author Lucien Bao, Austen Money
     */
    useEffect(() => {   
        (async () => {
            // This function is a specialized function that will only be called once,
            // when the component first renders. 
            
            // This is where you'll first set the user info. The same
            // stuff you're already doing to pull the user info into 
            // your state will happen in this function instead, so that
            // you're only doing it once (you're essentially caching the 
            // data you get from Clerk in your state). 
            
            // Any edits to the state will not be pushed to the Clerk database
            // unless the user clicks "submit", and no new info will be pulled from
            // the Clerk database after this one function is called. (We know what
            // the state looks like at the beginning of the component's lifecycle,
            // and we control anything that might change.)      
        })();
        dispatch({
            type: ActionType.UpdateUserInfo,
            updatedUserInfo: {
                // TODO: we assume some things are not null, is this okay?

                profilePicture: userProps.profilePicture as string,
                email: userProps!.email!,
                firstName: userProps!.firstName!,
                lastName: userProps!.lastName!,
                authorName: userProps.authorName as string,
                pronouns: userProps.pronouns as string,
                bio: userProps.bio as string,
                birthday: userProps.birthday as Date,
                raceEthnicity: userProps.raceEthnicity as RaceEthnicity,
                gender: userProps.gender as Gender,
                country: userProps.country as string,
                stateProvince: userProps.stateProvince as string,
                cityTown: userProps.cityTown as string,
                socialMedias: userProps.socialMedias as SocialMedias
            }
        });
        
    },
        [],
    );
    

    /**
     * Update view on form submit and print some debug information to the console.
     * @author Lucien Bao, Alana Sendlakowski, Vanessa Rose
     * @param event the event that has been changed
     */
    const handleSubmit = (event: any) => {
        // TODO: implement
    }

    /**
     * Change to edit mode.
     * @author Lucien Bao, Lydia Chen
     * @param event the event that has been changed
     */
    const switchToEdit = (event: any) => {
        dispatch({ type: ActionType.ToggleView });
    }

    /**
     * Select a country.
     * @author Lucien Bao, Ben Keen, Lydia Chen
     * @param value Updated country value.
     */
    const selectCountry = (value: string) => {
        const deepCopy = JSON.parse(JSON.stringify(userInfo));
        dispatch(
            {
                type: ActionType.UpdateUserInfo,
                updatedUserInfo: {
                    ...deepCopy,
                    country: value
                }
            }
        )
    }

    /**
     * Select a state/province.
     * @author Lucien Bao, Ben Keen, Lydia Chen
     * @param value Updated state/province value.
     */
    const selectStateProvince = (value: string) => {
        const deepCopy = JSON.parse(JSON.stringify(userInfo));
        dispatch(
            {
                type: ActionType.UpdateUserInfo,
                updatedUserInfo: {
                    ...deepCopy,
                    stateProvince: value
                }
            }
        )
    }

    /**
     * Upload new profile picture.
     * @author Lucien Bao, Lydia Chen
     * @param event the event that has been changed
     */
    const uploadPicture = (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const uploadedImage = event.target.files?.[0];
            const deepCopy = JSON.parse(JSON.stringify(userInfo));

            if (uploadedImage) {
                const newProfilePicture = URL.createObjectURL(uploadedImage);

                dispatch({
                    type: ActionType.UpdateUserInfo,
                    updatedUserInfo: {
                        ...deepCopy,
                        profilePicture: newProfilePicture,
                    },
                });
            }
        } catch (error) {
            console.error('Error Uploading New Profile Picture: ', error);
        }
    }

    /**
     * Delete current profile picture.
     * @author Lucien Bao, Lydia Chen
     * @param event the event that has been changed
     */
    const deletePicture = (event: any) => {
        const deepCopy = JSON.parse(JSON.stringify(userInfo));

        dispatch({
            type: ActionType.UpdateUserInfo,
            updatedUserInfo: {
                ...deepCopy,
                profilePicture: null,
            },
        });
    }

    /**
     * Handle any new changes to existing user data
     * @author Lydia Chen
     * @param field the field to be updated in the user data
     * @param value - The new value for the specified field
     */
    const handleChange = (field:string, value:any) => {
        const deepCopy = JSON.parse(JSON.stringify(userInfo));
        dispatch ({
          ...deepCopy,
          [field]: value,
        });
      };

    // Initializes a null reference
    const fileInputRef = useRef<HTMLInputElement>(null);

    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/

    /*----------------------------------------*/
    /* ---------------- Views --------------- */
    /*----------------------------------------*/

    // Body that will be filled with the current view
    let body: React.ReactNode;

    const country = userInfo!.country;
    const stateProvince = userInfo!.stateProvince;

    // Helper function for Preview mode display of user birthday
    const extractDateString = (date: Date) => {
        return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
    };

    // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     // Handle file selection here
    //     const selectedFile = event.target.files?.[0];
    //     if (selectedFile) {
    //         uploadPicture(selectedFile)
    //         console.log('Selected file:', selectedFile);
    //     }
    // };

    // Preview mode //
    if (view == View.Preview) {
        body = (
            <div className="p-10 px-20 bg-[#BFCAE6]">
                {/* Header portion */}
                <div className="grid grid-cols-2 pb-8">
                    <img className="rounded-full bg-gray-500 w-24 h-24" src={userInfo!.profilePicture as string} alt="Your profile picture" onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null; 
                        (e.target as HTMLImageElement).src = '#';       // Add src link to default img
                    }}/>
                    <button className="text-right pr-4" type="button" onClick={switchToEdit}>🖉 Edit</button>
                </div>

                {/* Biographical info */}
                <div className="border border-solid border-slate-400 rounded-xl mb-5 p-5">
                    <div>
                        <label className="font-bold">Email*</label>
                        <div className="py-4">{userInfo!.email}</div>
                    </div>

                    <div className="grid grid-cols-2 lg:pr-96">
                        <div>
                            <label className="font-bold">First Name</label>
                            <div className="py-4">{userInfo!.firstName}</div>
                        </div>
                    
                        <div>
                            <label className="font-bold">Last Name</label>
                            <div className="py-4">{userInfo!.lastName}</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:pr-96">
                        <div>
                            <div className="font-bold">Author Name*</div>
                            <div className="py-4">{userInfo!.authorName}</div>
                        </div>

                        <div>
                            <div className="font-bold">Pronouns</div>
                            <div className="py-4">{userInfo!.pronouns}</div>
                        </div>
                    </div>

                    <div className="font-bold">Bio*</div>
                    <div className="py-4">{userInfo!.bio}</div>

                    <div  className="grid md:grid-cols-3 grid-cols-2 lg:pr-96">
                        <div>
                            <div className="font-bold">Birthday</div>
                            <div className="py-4">{extractDateString(userInfo!.birthday!)}</div>
                        </div>

                        <div>
                            <div className="font-bold">Race/Ethnicity</div>
                            <div className="py-4">{userInfo!.raceEthnicity}</div>
                        </div>

                        <div>
                            <div className="font-bold">Gender</div>
                            <div className="py-4">{userInfo!.gender}</div>
                        </div>

                        <div>
                            <div className="font-bold">Country</div>
                            <div className="py-4">{userInfo!.country}</div>
                        </div>

                        <div>
                            <div className="font-bold">State</div>
                            <div className="py-4">{userInfo!.stateProvince}</div>
                        </div>

                        <div>
                            <div className="font-bold">City</div>
                            <div className="py-4">{userInfo!.cityTown}</div>
                        </div>
                    </div>
                </div>
                
                {/* Social media */}
                <div className="border border-solid border-slate-400 rounded-xl p-5">
                    <label className="font-bold">Socials</label>

                    <div className="grid md:grid-cols-2 grid-cols-1">
                        <div className="py-4">
                            <label className="font-bold inline mr-5">LinkedIn</label>
                            <div className="inline">{userInfo!.socialMedias.LinkedIn}</div>
                        </div>
                        
                        <div className="py-4">
                            <label className="font-bold inline mr-5">Instragram</label>
                            <div className="inline">{userInfo!.socialMedias.Instagram}</div>
                        </div>

                        <div className="py-4">
                            <label className="font-bold inline mr-5">X/Twitter</label>
                            <div className="inline">{userInfo!.socialMedias.X}</div>
                        </div>

                        <div className="py-4">
                            <label className="font-bold inline mr-5">Facebook</label>
                            <div className="inline">{userInfo!.socialMedias.Facebook}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Edit mode //
    else {
        body = (
            <form onSubmit={handleSubmit} id="profileEdit" className="p-10 px-20 bg-[#BFCAE6]">
                {/* Header portion */}
                <div className="flex flex-col-4 items-center gap-5 pb-8 gap-x-5">
                    <img className="rounded-full bg-gray-500 w-24 h-24" src={userInfo!.profilePicture as string} alt="Your profile picture" onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null; 
                        (e.target as HTMLImageElement).src = '#';       // Add src link to default img
                    }}/>
                    
                    <input type="file" accept="image/*" ref={fileInputRef} onChange={uploadPicture}/>
                    {/* <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded h-10">Upload Photo</button> */}
                    <button type="button" onClick={deletePicture} className="bg-transparent hover:bg-gray-400 text-gray-500 font-bold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded h-10">Delete Photo</button>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10">✓ Done</button>
                </div>

                {/* Biographical info */}
                <div className="bg-white border border-solid border-slate-400 rounded-xl mb-5 p-5">
                    <label className="font-bold" htmlFor="email">Email</label><br />
                    <input className="border-b-2 my-4 w-80" type="text" id="email" defaultValue={userInfo?.email} onChange={(e) => handleChange('email', e.target.value)} required/><br />

                    <div className="grid xl:grid-cols-2 lg:pr-96 grid-cols-1">
                        <div>
                            <label className="font-bold" htmlFor="fname">First Name</label><br />
                            <input className="border-b-2 my-4 w-80" type="text" id="fname" defaultValue={userInfo?.firstName}/>
                        </div>
                        
                        <div>
                            <label className="font-bold" htmlFor="lname">Last Name</label><br />
                            <input className="border-b-2 my-4 w-80" type="text" id="lname" defaultValue={userInfo?.lastName}/> 
                        </div>
                    </div>

                    <div className="grid xl:grid-cols-2 lg:pr-96 grid-cols-1">
                        <div>
                            <label className="font-bold" htmlFor="aname">Author Name</label><br />
                            <input className="border-b-2 my-4 w-80" type="text" id="aname" defaultValue={userInfo?.authorName} required/>
                        </div>
                        
                        <div>
                            <label className="font-bold" htmlFor="pronouns">Pronouns</label><br />
                            <input className="border-b-2 my-4 w-80" type="text" id="pronouns" defaultValue={userInfo?.pronouns}/>
                        </div>  
                    </div>

                    <div className="lg:pr-96">
                        <label className="font-bold" htmlFor="bio">Bio</label><br />
                        <textarea className="my-4 pl-2 border border-gray-400 rounded" id="bio" name="profileEdit" rows={4} cols={50}
                        placeholder="Tell us about yourself!" defaultValue={userInfo?.bio} required/>
                    </div>
                   
                    <div  className="grid md:grid-cols-3 grid-cols-2 xl:pr-96">
                        <div>
                            <label className="font-bold" htmlFor="birthday">Birthday</label><br />
                            <input className="border-b-2 my-4 w-48" type="date" id="birthday" defaultValue={userInfo?.birthday}/>
                            {/* Need to make function to update birthday */}
                        </div>
                        
                        <div>
                            <label className="font-bold" htmlFor="raceEthnicity">Race/Ethnicity</label><br />
                            <select className="my-4 bg-gray-300 rounded w-48" form="profileEdit" name="profileEdit" id="raceEthnicity">
                                <option value="default" selected={userInfo?.raceEthnicity?.toLowerCase() == "default" || undefined}>Select</option>
                                <option value="americanindian" selected={userInfo?.raceEthnicity?.toLowerCase() == "americanindian"}>{RaceEthnicity.AmericanIndian}</option>
                                <option value="asian" selected={userInfo?.raceEthnicity?.toLowerCase() == "asian"}>{RaceEthnicity.Asian}</option>
                                <option value="black" selected={userInfo?.raceEthnicity?.toLowerCase() == "black"}>{RaceEthnicity.Black}</option>
                                <option value="nativehawaiian" selected={userInfo?.raceEthnicity?.toLowerCase() == "nativehawaiian"}>{RaceEthnicity.NativeHawaiian}</option>
                                <option value="white" selected={userInfo?.raceEthnicity?.toLowerCase() == "white"}>{RaceEthnicity.White}</option>
                                <option value="other" selected={userInfo?.raceEthnicity?.toLowerCase() == "other"}>{RaceEthnicity.Other}</option>
                            </select>
                        </div>
                        
                        <div>
                            <label className="font-bold" htmlFor="gender">Gender</label><br />
                            <select className="my-4 bg-gray-300 rounded w-48" form="profileEdit" name="profileEdit" id="gender">
                                <option value="default">Select</option>
                                <option value="female" selected={userInfo?.gender?.toLowerCase() == "female"}>{Gender.Female}</option>
                                <option value="male" selected={userInfo?.gender?.toLowerCase() == "male"}>{Gender.Male}</option>
                                <option value="non-binary" selected={userInfo?.gender?.toLowerCase() == "non-binary"}>{Gender.Nonbinary}</option>
                                <option value="other" selected={userInfo?.gender?.toLowerCase() == "other"}>{Gender.Other}</option>
                            </select>
                        </div>
                        
                        <div>
                            <div className="font-bold mb-4">Country</div>
                            <div className="relative">
                                <CountryDropdown
                                value={country!}
                                onChange={selectCountry}
                                priorityOptions={["US"]}
                                style={{ width: '192px' }}
                                />
                                <div className="border-b-2 border-gray-500 w-48"></div>
                            </div>
                        </div>
                        
                        <div>
                            <div className="font-bold mb-4">State/Province</div>
                            <div className="relative">
                                <RegionDropdown
                                country={country!}
                                value={stateProvince!}
                                onChange={selectStateProvince}
                                style={{ width: '192px' }}
                                />
                                <div className="border-b-2 border-gray-500 w-48"></div>
                            </div>
                        </div>                        

                        <div>
                            <div className="font-bold" htmlFor="cityTown">City</div>
                            <input className="border-b-2 border-gray-500 my-4" type="text" id="cityTown" value={userInfo?.cityTown}/>
                        </div>
                        
                    </div>
                    
                </div>

                {/* Social media */}
                <div className="bg-white border border-solid border-slate-400 rounded-xl p-5">
                    <label className="font-bold">Socials</label>

                    <div className="grid lg:grid-cols-2 grid-cols-1">
                        <div>
                            <label className="font-bold pr-4" htmlFor="linkedin">LinkedIn</label>
                            <input className="border-b-2 my-4 w-80" type="text" id="linkedin" defaultValue={userInfo?.socialMedias.LinkedIn}/>
                        </div>
                        
                        <div>
                            <label className="font-bold pr-4" htmlFor="instagram">Instagram</label>
                            <input className="border-b-2 my-4 w-80" type="text" id="instagram" defaultValue={userInfo?.socialMedias.Instagram}/>
                        </div>
                       
                        <div>
                            <label className="font-bold pr-4" htmlFor="xTwitter">X/Twitter</label>
                            <input className="border-b-2 my-4 w-80" type="text" id="xTwitter" defaultValue={userInfo?.socialMedias.X}/>
                        </div>
                        
                        <div>
                            <label className="font-bold pr-4" htmlFor="facebook">Facebook</label>
                            <input className="border-b-2 my-4 w-80" type="text" id="facebook" defaultValue={userInfo?.socialMedias.Facebook}/>
                        </div>
                    </div>
                    
                </div>
            </form>
        );
    }

    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/

    return (
        <div>
            {body}
        </div>
    );
};

/*------------------------------------------------------------------------*/
/* ------------------------------- Wrap Up ------------------------------ */
/*------------------------------------------------------------------------*/

// Export component
export default ProfileReview;