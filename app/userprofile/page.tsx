"use client";
import React from "react";
import "../globals.css";
import { Userprofile } from "../Interfaces/user";
import Button from "../Reusables/button";

export default function UserProfile() {

    //DATA BY DEFAULT
    const [user, setUser] = React.useState<Userprofile>({
        name: "User Test",
        email: "user.test@test.com",
        profilePicture: "../../avatar-default.png"
    })

    const [isEdit, setisEdit] = React.useState(false);
    const [form, setForm] = React.useState({
        name: user.name,
        email: user.email,
    });
    const [isEmailValid, setIsEmailValid] = React.useState(true);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
        if (name === "email") {
            validateEmail(value);
        }
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
        setIsEmailValid(emailRegex.test(email));
    };

    const handleEdit = () => {
        setisEdit(true);
    };

    const handleSave = () => {
        if (!isEmailValid) {
            alert("Please enter a valid email address");
            return;
        }
        setUser({
            ...user,
            name: form.name,
            email: form.email
        });
        setisEdit(false)
    }

    const handleCancel = () => {
        setisEdit(false);
        setForm({
            name: user.name,
            email: user.email,
        });
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4"> User Profile</h1>
            <div className="w-24 mb-4">
                <img src="../../avatar-default.png" alt="Profile picture" />
            </div>
            {!isEdit ? (
                <div>
                    <p>
                        <span className="font-bold text-xl">Name:</span>
                        {user.name}
                    </p>
                    <p>
                        <span className="font-bold text-xl">Email:</span>
                        {user.email}
                    </p>
                    {/* <button
                        onClick={handleEdit}
                        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
                    >
                        Edit
                    </button> */}
                    <Button
                        onClick={handleEdit}
                        className="bg-blue-500">
                        Edit
                    </Button>
                </div>
            ) : (
                <form className="mt-4">
                    <div className="mb-2">
                        <label className="block font-bold" htmlFor="name">
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleInputChange}
                            className="border px-2 py-1 w-full md:w-1/2 text-black"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block font-bold" htmlFor="email">
                            Email:
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleInputChange}
                            className={`border px-2 py-1 w-full md:w-1/2 text-black ${isEmailValid ? "" : "border-red-500"}`}
                        />
                    </div>
                    <div className="flex">
                        <Button
                            onClick={handleSave}
                            className="bg-blue-500">
                            Save
                        </Button>
                        <Button
                            onClick={handleCancel}
                            className="bg-zinc-600">
                            Cancel
                        </Button>
                    </div>

                </form>
            )}
        </div>
    )

}