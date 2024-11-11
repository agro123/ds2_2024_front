import { Footer } from "antd/es/layout/layout"

export const CustomFooter = () => {
    return (
        <Footer
            style={{
                textAlign: 'center',
            }}
        >
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
    )
}
