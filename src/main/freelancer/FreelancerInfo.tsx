import React from 'react';

type Props = {
    info: UserInfo
}

type UserInfo = {
    id: string,
    email: string,
    first_name: string,
    last_name: string,
    phone: string,
    role: string
    status: "ACTIVE" | "INACTIVE"
}

export const FreelancerInfo = (props: Props) => {
    return (
        <div>
            <div>
                <p>First name:</p>
                <p>Last name:</p>
                <p>E-mail:</p>
                <p>Phone:</p>
                <p>Role:</p>
                <p>Status:</p>
            </div>
            <div>
                <p>{props.info.first_name}</p>
                <p>{props.info.last_name}</p>
                <p>{props.info.email}</p>
                <p>{props.info.phone}</p>
                <p>{props.info.phone}</p>
                <p>{props.info.status}</p>
            </div>
        </div>
    )

}