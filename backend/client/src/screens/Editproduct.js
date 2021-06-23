import React, { useState, useEffect, useRef } from "react";
import {
	Row,
	Col,
	Card,
	PageHeader,
	Button,
	Form,
	Input,
	Select,
	message,
	Avatar,
} from "antd";
import { Link, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
	fetchCategory,
	upload,
	updateProduct,
	fetchProduct,
} from "./../api/product";
import parse from "html-react-parser";
import { Editor } from "@tinymce/tinymce-react";
const Category = ({ history }) => {
	const { Option } = Select;
	const queryClient = useQueryClient();
	const { data: categories } = useQuery("categories", fetchCategory);
	const { data: products } = useQuery("products", fetchProduct);

	const [state, setState] = useState({
		id: "",
		title: "",
		slug: "",
		image: "",
		description: "",
		unit: "",
		price: "",
		privousPrice: "",
		discountInPercent: "",
		categoryId: "",
	});

	const { id } = useParams();

	const editorRef = useRef(null);
	const updatePolicyHandler = () => {
		if (editorRef.current) {
			setState((p) => ({ ...p, description: editorRef.current.getContent() }));
		}
	};

	const loadProduct = (id, products) => {
		if (id !== undefined && products !== undefined) {
			const product = products.find((x) => x._id === id);
			if (product) {
				console.log(product);
				const {
					description,
					discountInPercent,
					image,
					price,
					title,
					unit,
					privousPrice,
					categoryId,
				} = product;

				setState((p) => ({
					...p,
					id,
					title,
					privousPrice,
					unit,
					price,
					image,
					discountInPercent,
					description,
					categoryId,
				}));
			}
		}
	};

	useEffect(() => {
		loadProduct(id, products);
	}, [id, products]);

	const { mutate: uploadAction, isLoading: uploading } = useMutation(upload, {
		onSuccess: (res) => {
			message.success("upload complete");
			console.log(res.url);
			setState((p) => ({ ...p, image: res.url }));
		},
		onError: (e) => {
			message.error(e.response.data.mesage);
		},
	});

	const handleImageUplaod = async (e) => {
		if (e.target.files !== null) {
			var formData = new FormData();
			formData.append("photo", e.target.files[0]);
			uploadAction(formData);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setState((p) => ({ ...p, [name]: value }));
	};

	const { mutate: updateProductAction, isLoading: adding } = useMutation(
		updateProduct,
		{
			onSuccess: () => {
				message.success("Updated");
				queryClient.invalidateQueries("products");
			},
			onError: (e) => {
				message.error(e.response.data.mesage);
			},
		}
	);

	const productAddHandler = () => {
		//addProduct
		updateProductAction(state);
	};

	return (
		<>
			<Row>
				<Col xs={24} md={24} sm={24} lg={24}>
					<PageHeader
						className="pageHeader"
						onBack={() => history.goBack()}
						title="Product Update"
						extra={[
							<Link key="1" to="/product">
								<Button>Back</Button>
							</Link>,
						]}
					/>
				</Col>
				<Col xs={24} md={24} sm={24} lg={24}>
					<Card>
						<Row gutter={[8, 8]}>
							<Col xs={24} sm={24} md={12} lg={12}>
								<Form layout="vertical">
									<Form.Item label="Category">
										<Select
											onChange={(e, d) => {
												setState((p) => ({ ...p, categoryId: d.key }));
											}}
											placeholder="Select Category"
										>
											{categories &&
												categories.map((x) => (
													<Option key={x._id} value={x.title}>
														{x.title}
													</Option>
												))}
										</Select>
									</Form.Item>
									<Form.Item label="Title">
										<Input
											onChange={handleInputChange}
											name="title"
											value={state.title}
										/>
									</Form.Item>
									<Form.Item label="Slug">
										<Input
											onChange={handleInputChange}
											name="slug"
											value={state.slug}
										/>
									</Form.Item>
									<Form.Item label="Image">
										<Input type="file" onChange={handleImageUplaod} />
									</Form.Item>
									<Form.Item label="Description">
										<Editor
											onBlur={(e) => {
												updatePolicyHandler();
											}}
											apiKey="yy95othwffaqkpskd5k5aqw8wu3wz0z8b1g526krzi2vh80j"
											onInit={(evt, editor) => (editorRef.current = editor)}
											initialValue={state.description}
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

										{/* <Input.TextArea
											onChange={handleInputChange}
											name="description"
											value={state.description}
										/> */}
									</Form.Item>
									<Form.Item label="Unit">
										<Input
											onChange={handleInputChange}
											name="unit"
											value={state.unit}
										/>
									</Form.Item>
									<Form.Item label="Sales Price">
										<Input
											onChange={handleInputChange}
											name="price"
											value={state.price}
											type="number"
										/>
									</Form.Item>
									<Form.Item label="Previous Price">
										<Input
											onChange={handleInputChange}
											name="privousPrice"
											value={state.privousPrice}
											type="number"
										/>
									</Form.Item>
									<Form.Item label="Discount In Percent">
										<Input
											onChange={handleInputChange}
											name="discountInPercent"
											value={state.discountInPercent}
											type="number"
										/>
									</Form.Item>
									<Form.Item>
										<Button
											onClick={productAddHandler}
											disabled={uploading || adding}
										>
											{uploading ? "Uploading" : "Submit"}
										</Button>
									</Form.Item>
								</Form>
							</Col>
							<Col xs={24} sm={24} md={12} lg={12}>
								<Card title="preview">
									<div
										style={{
											display: "flex",
											flexDirection: "column",
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<Avatar size={100} src={state.image} />
										<h2>{state.title}</h2>
										<h3>{state.price ? `৳ ${state.price}` : ""}</h3>
										<p>{parse(state.description)}</p>
									</div>
								</Card>
							</Col>
						</Row>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default Category;
