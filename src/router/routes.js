import LoginPage from "views/Auth/LoginPage/LoginPage";
import InboxListPage from "views/Inbox/InboxListPage/InboxListPage";
import CustomerPage from "views/Customer/CustomerPage";
import CustomerAddPage from "views/Customer/CustomerAdd/index"
import InboxMessageDetailPage from "views/Inbox/InboxMessageDetailPage/InboxMessageDetailPage";
import AccountSettingPage from "views/Account/Setting/index"
import PricingPage from "views/pricing-page/index"

export const authorizedRoutes = [
  {
    title: "Inbox List",
    key: "inbox-list",
    path: "/",
    element: <InboxListPage />,
  },
  {
    title: "Inbox Detail",
    key: "inbox-detail",
    path: "/inbox/:id",
    element: <InboxMessageDetailPage />,
  },
  {
    title: "Customers",
    key: "customers",
    path: "/customers",
    element: <CustomerPage />,
  },
  {
    title: "Customer Add",
    key: "customer-add",
    path: "/customerAdd",
    element: <CustomerAddPage />,
  },
  {
    title: "Account Setting",
    key: "account-setting",
    path: "/accountSetting",
    element: <AccountSettingPage />,
  },
  {
    title: "Pricing",
    key: "pricing",
    path: "/pricing",
    element: <PricingPage />,
  },
];
export const routes = [
  {
    title: "Login",
    key: "login",
    path: "/login",
    element: <LoginPage />,
  },
  {
    title: "Signup",
    key: "signup",
    path: "/signup",
    element: <div>Signup</div>,
  },
];
