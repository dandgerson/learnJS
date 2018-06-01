'use strict';

let userFormTemplate = '<div class="user-form">\n' +
    '               This is The User Form!\n' +
    '                <form data-id="userForm">\n' +
    '                   <% for (let prop in user) { %>\n' +
    '                       <% if (prop === "_id") { %>\n' +
    '                           <span><%=prop %>: </span><span><%=user[prop] %>"<span><br>\n' +
    '                            <% continue; %>\n' +
    '                        <% } %>\n' +
    '                        <% if (prop === "email") { %>\n' +
    '                            <span><%=prop %>: </span><input type="email" name="<%=prop %>" value="<%=user[prop] %>"><br>\n' +
    '                            <% continue; %>\n' +
    '                        <% } %>\n' +
    '                        <span><%=prop %>: </span><input name="<%=prop %>" value="<%=user[prop] %>"><br>\n' +
    '                    <% } %>\n' +
    '                    <input type="button" name="save" value="save">\n' +
    '                </form>\n' +
    '            </div>';