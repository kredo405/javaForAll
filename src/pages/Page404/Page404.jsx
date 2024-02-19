import { Button, Result } from 'antd';
import { Link } from "react-router-dom";

const Page404 = () => {
    return (
        <Result
        status="404"
        title="404"
        subTitle="К сожалению, страница, которую вы посетили, не существует."
        extra={<Button type="primary">
            <Link to='/main'>На главную</Link>
            </Button>}
    />
    )
}

export default Page404;