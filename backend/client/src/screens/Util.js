import React, { useState, useEffect, useRef } from "react";
import {
	Table,
	Row,
	Col,
	Card,
	PageHeader,
	Button,
	Modal,
	Input,
	message,
	Popconfirm,
	Form,
} from "antd";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { DeleteOutlined } from "@ant-design/icons";
import { upload } from "./../api/product";
import { utilUpdate, fetchUtil } from "./../api/util";
import { bannerAdd, fetchBanner, deleteBanner } from "./../api/banner";
import { deleteFaq, fetchFaq, FaqAdd } from "./../api/faq";
import { Editor } from "@tinymce/tinymce-react";

const Util = ({ history }) => {
	const queryclient = useQueryClient();
	const { data: utilData } = useQuery("utils", fetchUtil);
	const { data: banners } = useQuery("banners", fetchBanner);
	const [util, setUtil] = useState({
		logo: "",
		privacy: "",
		underMaintain: "",
	});
	useEffect(() => {
		if (utilData !== undefined) {
			setUtil((p) => ({
				...p,
				logo: utilData?.logo,
				privacy: utilData?.privacy,
			}));
		}
	}, [utilData]);
	const { mutate: updateUtilAction, isLoading: updateUtilProcess } =
		useMutation(utilUpdate, {
			onSuccess: (res) => {
				message.success("Updated ! ");
				queryclient.invalidateQueries("utils");
			},
			onError: (e) => {
				message.error(e.response.data.mesage);
			},
		});
	const { mutate: uploadAction } = useMutation(upload, {
		onSuccess: (res) => {
			// Update Icon
			message.success("upload complete");
			message.success("Updating...");
			setUtil((p) => ({ ...p, logo: res.url }));
			updateUtilAction({ logo: res.url });
		},
		onError: (e) => {
			message.error(e.response.data.mesage);
		},
	});
	const handleImageUplaod = async (e) => {
		if (e.target.files !== null) {
			var formData = new FormData();
			formData.append("photo", e.target.files[0]);
			message.success("Uploading...");
			uploadAction(formData);
		}
	};
	const { mutate: addBannerAction } = useMutation(bannerAdd, {
		onSuccess: (res) => {
			message.success("added ! ");
			queryclient.invalidateQueries("banners");
		},
		onError: (e) => {
			message.error(e.response.data.mesage);
		},
	});
	const { mutate: bannerUploadAction } = useMutation(upload, {
		onSuccess: (res) => {
			// Update Icon
			message.success("upload complete");
			message.success("Adding...");

			addBannerAction({ banner: res.url });
		},
		onError: (e) => {
			message.error(e.response.data.mesage);
		},
	});
	const handleBannerUplaod = async (e) => {
		if (e.target.files !== null) {
			var formData = new FormData();
			formData.append("photo", e.target.files[0]);
			message.success("Uploading...");
			bannerUploadAction(formData);
		}
	};
	const { mutate: deleteBannerAction } = useMutation(deleteBanner, {
		onSuccess: (res) => {
			// Update Icon
			message.success("Deleted");
			queryclient.invalidateQueries("banners");
		},
		onError: (e) => {
			message.error(e.response.data.mesage);
		},
	});

	const editorRef = useRef(null);
	const updatePolicyHandler = () => {
		if (editorRef.current) {
			const privacy = editorRef.current.getContent();
			updateUtilAction({ privacy });
		}
	};

	const [faqModal, setFaqModal] = useState(false);
	const { data: faqs, isLoading: faqFetching } = useQuery("faqs", fetchFaq);
	// FAQ
	const [faq, setFaq] = useState({
		question: "",
		answar: "",
	});
	const { mutate: addFaqAction, isLoading: faqAddLoading } = useMutation(
		FaqAdd,
		{
			onSuccess: (res) => {
				// Update Icon
				message.success("Added");
				queryclient.invalidateQueries("faqs");
				setFaqModal(false);
				setFaq({
					question: "",
					answar: "",
				});
			},
			onError: (e) => {
				message.error(e.response.data.mesage);
			},
		}
	);

	const { mutate: deleteFaqAction } = useMutation(deleteFaq, {
		onSuccess: (res) => {
			message.success("Deleted");
			queryclient.invalidateQueries("faqs");
		},
		onError: (e) => {
			message.error(e.response.data.mesage);
		},
	});

	const columns = [
		{
			title: "Serial",
			dataIndex: "name",
			key: "name",
			render: (a, b, c) => <>{c + 1}</>,
		},
		{
			title: "Question",
			dataIndex: "question",
			key: "question",
		},
		{
			title: "Answar",
			dataIndex: "answar",
			key: "answar",
		},
		{
			title: "Action",
			dataIndex: "_id",
			key: "_id",
			render: (id) => (
				<Popconfirm
					onConfirm={() => {
						deleteFaqAction({ id });
					}}
					title="Are you sure ?"
				>
					<Button size="small" icon={<DeleteOutlined />}></Button>
				</Popconfirm>
			),
		},
	];

	return (
		<>
			<Row gutter={[8, 8]}>
				<Col xs={24} md={24} sm={24} lg={24}>
					<PageHeader
						className="pageHeader"
						onBack={() => history.goBack()}
						title="Orders"
					/>
				</Col>
				<Col xs={24} md={8} sm={8} lg={8}>
					<Row>
						<Col xs={24} md={24} sm={24} lg={24}>
							<Card title="Logo">
								<div
									style={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										flexDirection: "column",
									}}
								>
									<img
										src={util.logo}
										alt="logo"
										style={{ maxWidth: 150, height: "auto" }}
									/>
									<Form layout="vertical">
										<Form.Item>
											<input
												type="file"
												onChange={(e) => {
													handleImageUplaod(e);
												}}
											/>
										</Form.Item>
									</Form>
								</div>
							</Card>
						</Col>
						<Col xs={24} md={24} sm={24} lg={24}>
							<Card title="Banner">
								<Form layout="vertical">
									<Form.Item>
										<input
											type="file"
											onChange={(e) => {
												handleBannerUplaod(e);
											}}
										/>
									</Form.Item>
								</Form>

								<ul className="categories">
									{banners &&
										banners.map((x) => (
											<li key={x._id}>
												<span>
													<img
														style={{ maxWidth: 100 }}
														alt=""
														src={x.banner}
													/>
												</span>
												<span>
													<Popconfirm
														title="Delete Parmanently ?"
														onConfirm={() => {
															deleteBannerAction({ id: x._id });
														}}
													>
														<Button icon={<DeleteOutlined />}></Button>
													</Popconfirm>
												</span>
											</li>
										))}
								</ul>
							</Card>
						</Col>
					</Row>
				</Col>
				<Col xs={24} md={16} sm={16} lg={16}>
					<Row>
						<Col xs={24} md={24} sm={24} lg={24}>
							<Card title="Privecy and Policy">
								<Editor
									apiKey="yy95othwffaqkpskd5k5aqw8wu3wz0z8b1g526krzi2vh80j"
									onInit={(evt, editor) => (editorRef.current = editor)}
									initialValue={util.privacy}
									init={{
										height: 300,
										menubar: false,
										plugins: [
											"advlist autolink lists link image charmap print preview anchor",
											"searchreplace visualblocks code fullscreen",
											"insertdatetime media table paste code help wordcount",
										],
										toolbar:
											"undo redo | formatselect | " +
											"bold italic backcolor | alignleft aligncenter " +
											"alignright alignjustify | bullist numlist outdent indent | " +
											"removeformat | help",
										content_style:
											"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
									}}
								/>
								<div style={{ marginTop: 10 }}>
									<Button
										loading={updateUtilProcess}
										onClick={updatePolicyHandler}
									>
										Update Privecy & Policy
									</Button>
								</div>
							</Card>
						</Col>
						<Col xs={24} md={24} sm={24} lg={24}>
							<Card
								title="FAQ"
								extra={[
									<Button onClick={() => setFaqModal(true)} key="1">
										Add new FAQ
									</Button>,
								]}
							>
								<Table
									rowKey="_id"
									loading={faqFetching}
									size="small"
									columns={columns}
									dataSource={faqs}
								/>
							</Card>
						</Col>
					</Row>
				</Col>
			</Row>

			<Modal
				title="Add FAQ"
				visible={faqModal}
				onOk={() => {
					const { answar, question } = faq;
					if (question === "") {
						message.error("Question is empty ?");
					} else if (answar === "") {
						message.error("Answar is empty ?");
					} else {
						addFaqAction(faq);
					}
				}}
				onCancel={() => setFaqModal(false)}
				centered
				okText="Add"
				okButtonProps={{ loading: faqAddLoading }}
			>
				<Form layout="vertical">
					<Form.Item label="Question">
						<Input
							value={faq.question}
							onChange={(e) =>
								setFaq((p) => ({ ...p, question: e.target.value }))
							}
						/>
					</Form.Item>
					<Form.Item label="Answar">
						<Input.TextArea
							value={faq.answar}
							onChange={(e) =>
								setFaq((p) => ({ ...p, answar: e.target.value }))
							}
						/>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default Util;
