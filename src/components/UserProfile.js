import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export function UserProfile () {

    const { user } = useAuth0()


    return (
        <>
            <div className="text-white relative">
                <div className="text-white">Settings</div>
                <div className="[&>div]:flex">
                    <div>
                        <div>Email</div>
                        <div>{user && user.email}</div>
                    </div>
                    <div>
                        <div>Username:</div>
                        <div>...</div>
                    </div>
                    <div>penis</div>
                    <div>penis</div>
                    <div>penis</div>
                </div>
            </div>
        </>
    )
}