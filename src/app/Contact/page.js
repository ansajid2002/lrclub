"use client"
import { useState } from 'react';
import { Form, Input, Select, Button, message, Card, Spin } from 'antd';
import Swal from 'sweetalert2';

const { Option } = Select;

const submitFormData = async (formData) => {
    try {
        const response = await fetch('/api/ContactForm', {
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


const Contact = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = (formData) => {
        setLoading(true);
        submitFormData(formData).finally(() => {
            setLoading(false);
        });
    };

    return (
        <div className="container mx-auto mt-8 p-4 flex justify-center">

            {/* Right side form in Ant Design Card */}
            <div className="w-full md:w-1/2">
                <Card title="Contact Form" className="w-full">
                    <Form
                        form={form}
                        name="ContactForm"
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your email!',
                                },
                            ]}
                        >
                            <Input type="email" />
                        </Form.Item>

                        <Form.Item
                            label="Full Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your Full name!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>


                        <Form.Item
                            label="Mobile Number"
                            name="mobile"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your Mobile Number',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>        

                        <Form.Item
                            label="Preferred Contact Method"
                            name="contact_mode"
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
                            label="Additional Comments"
                            name="comments"
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

export default Contact;
