"use client"
import { useState } from 'react';
import { Form, Input, Select, Button, message, Card, Spin } from 'antd';
import Swal from 'sweetalert2';

const { Option } = Select;

const submitAdFormData = async (formData) => {
    try {
        const response = await fetch('/api/AdForm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const data = await response.json();

            // Show success message using Ant Design message
            message.success('Form submitted successfully');

            // Alternatively, use SweetAlert for a more styled alert
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Form submitted successfully',
            });
        } else {
            // Handle error, show an error message
            console.error('Error submitting form');
            message.error('Error submitting form');
        }
    } catch (error) {
        console.error('Error submitting form', error);
        message.error('Error submitting form');
    }
};


const AdvertiserContact = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = (formData) => {
        setLoading(true);
        submitAdFormData(formData).finally(() => {
            form.resetFields()
            setLoading(false);
        });
    };


    return (
        <div className="container mx-auto mt-8 p-4 flex justify-center items-center">
            {/* Left side image */}
            <div className="md:w-1/2 pr-8  hidden md:flex flex-col  sticky top-32 h-screen">
                <img
                    src="https://www.sender.net/wp-content/uploads/2022/08/b059-What-is-online-advertising-small.webp"  // Replace with your actual image URL
                    alt="Placeholder"
                    className="w-full h-auto"
                />
            </div>

            {/* Right side form in Ant Design Card */}
            <div className="w-full md:w-1/2">
                <Card title="Advertiser Contact Form" className="w-full">
                    <Form
                        form={form}
                        name="advertiserContactForm"
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <Form.Item
                            label="Business Email"
                            name="business_email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your business email!',
                                },
                            ]}
                        >
                            <Input type="email" />
                        </Form.Item>

                        <Form.Item
                            label="First Name"
                            name="first_name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your first name!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Last Name"
                            name="last_name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your last name!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Company Name"
                            name="company_name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your company name!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Phone Number"
                            name="phone_number"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your phone number!',
                                },
                            ]}
                        >
                            <Input type="tel" />
                        </Form.Item>

                        <Form.Item
                            label="Country"
                            name="country"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your country!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Preferred Contact Method"
                            name="preferred_contact_method"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select your preferred contact method!',
                                },
                            ]}
                        >
                            <Select>
                                <Option value="email">Email</Option>
                                <Option value="phone">Phone</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Campaigns Budget"
                            name="campaigns_budget"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your campaigns budget!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Additional Comments"
                            name="additional_comments"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter additional comments!',
                                },
                            ]}
                        >
                            <Input.TextArea />
                        </Form.Item>

                        <Form.Item>
                            <Button type="default" className='bg-blue-400 text-white text-lg flex justify-center items-center' htmlType="submit" loading={loading}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default AdvertiserContact;
