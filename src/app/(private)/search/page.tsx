"use client";

import { searchUsers } from "@/server-actions/users";
import { Button, Input, message } from "antd";
import React, { useState } from "react";
import UserSearchResults from "./_components/UserSearchResults";

const Search = () => {
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  const searchHandler = async () => {
    try {
      setLoading(true);
      const response: any = await searchUsers(searchValue);
      if (response.success) {
        setUsers(response.data);
        console.log(response?.data)
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h1 className="text-xl font-bold text-primary">
        Search Users, Posts, Hastags
      </h1>
      <div className="flex gap-5 mt-5">
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search Users, Posts, Hastags"
        />
        <Button type="primary" onClick={searchHandler}>Search</Button>
      </div>
      <UserSearchResults users={users}/>
    </div>
  );
};

export default Search;
