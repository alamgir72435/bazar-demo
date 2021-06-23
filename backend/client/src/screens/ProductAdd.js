import React, { useState } from "react";
import {
	Row,
	Col,
	Card,
	PageHeader,
	Button,
	Form,
	Input,
	Select,
	Modal,
	message,
	Avatar,
	Popconfirm,
} from "antd";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
	addCategory,
	fetchCategory,
	upload,
	addProduct,
	deleteCategory,
	udpateCategory,
} from "./../api/product";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const Category = ({ history }) => {
	const { Option } = Select;
	const queryClient = useQueryClient();
	const { data: categories } = useQuery("categories", fetchCategory);
	const [categoryModal, setCategoryModal] = useState(false);
	const [category, setCategory] = useState({
		title: "",
		slug: "",
		icon: "",
	});
	const [state, setState] = useState({
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

	const { mutate: addCategoryAction, isLoading: categoryAddLoading } =
		useMutation(addCategory, {
			onSuccess: () => {
				message.success("Added");
				queryClient.invalidateQueries("categories");
				setCategory({
					title: "",
					slug: "",
					icon: "",
				});
				setCategoryModal(false);
			},
			onError: (e) => {
				message.error(e.response.data.mesage);
			},
		});

	const { mutate: uploadAction, isLoading: uploading } = useMutation(upload, {
		onSuccess: (res) => {
			message.success("upload complete");
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

	const { mutate: addProductAction, isLoading: adding } = useMutation(
		addProduct,
		{
			onSuccess: () => {
				message.success("Added");
				queryClient.invalidateQueries("products");
				setState((p) => ({
					...p,
					title: "",
					image: "",
					description: "",
					unit: "",
					price: "",
					privousPrice: "",
					discountInPercent: "",
				}));
			},
			onError: (e) => {
				message.error(e.response.data.mesage);
			},
		}
	);

	const productAddHandler = () => {
		//addProduct
		addProductAction(state);
	};

	const { mutate: deleteCategoryAction } = useMutation(deleteCategory, {
		onSuccess: () => {
			message.success("Added");
			queryClient.invalidateQueries("categories");
		},
		onError: (e) => {
			message.error(e.response.data.mesage);
		},
	});

	// category update state
	const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
	const [udpatecCat, setUdpatecCat] = useState({
		id: "",
		icon: "",
		slug: "",
		title: "",
	});

	const { mutate: updateCategoryAction, isLoading: updateLoading } =
		useMutation(udpateCategory, {
			onSuccess: () => {
				message.success("Updated");
				queryClient.invalidateQueries("categories");
				setUpdateCategoryModal(false);
			},
			onError: (e) => {
				message.error(e.response.data.mesage);
			},
		});

	return (
		<>
			<Row>
				<Col xs={24} md={24} sm={24} lg={24}>
					<PageHeader
						className="pageHeader"
						onBack={() => history.goBack()}
						title="Product"
						extra={[
							<Link key="1" to="/product">
								<Button>Back</Button>
							</Link>,
							<Button onClick={() => setCategoryModal(true)} key="2">
								Category Add
							</Button>,
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
										<Input.TextArea
											onChange={handleInputChange}
											name="description"
											value={state.description}
										/>
									</Form.Item>
									<Form.Item label="Unit">
										<Input
											onChange={handleInputChange}
											name="unit"
											value={state.unit}
											type="number"
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
										<p>{state.description}</p>
									</div>
								</Card>

								<Row>
									<Col xs={24} sm={24} md={24} lg={24}>
										<Card title="Categories">
											<ul className="categories">
												{categories &&
													categories.map((x, i) => (
														<li key={x._id}>
															<span>
																<span>{i + 1} /</span> {x.title}
															</span>
															<span>
																<Button
																	onClick={() => {
																		const cat = categories.find(
																			(n) => n._id === x._id
																		);

																		const { icon, slug, title } = cat;
																		setUdpatecCat({
																			id: x._id,
																			icon,
																			slug,
																			title,
																		});
																		setUpdateCategoryModal(true);
																	}}
																	icon={<EditOutlined />}
																></Button>
																<Popconfirm
																	onConfirm={() => {
																		deleteCategoryAction({ id: x._id });
																	}}
																	title="parmanently Delete ?"
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
						</Row>
					</Card>
				</Col>
			</Row>

			<Card title="Ions">
				<Row gutter={[5,10]}>
					<Col xs={6} sm={4} md={3} lg={2}> Accessories </Col>
					<Col xs={6} sm={4} md={3} lg={2}> FruitsVegetable </Col>
					<Col xs={6} sm={4} md={3} lg={2}> MeatFish </Col>
					<Col xs={6} sm={4} md={3} lg={2}> Purse </Col>
					<Col xs={6} sm={4} md={3} lg={2}> HandBags </Col>
					<Col xs={6} sm={4} md={3} lg={2}> ShoulderBags </Col>
					<Col xs={6} sm={4} md={3} lg={2}> Wallet </Col>
					<Col xs={6} sm={4} md={3} lg={2}> LaptopBags </Col>
					<Col xs={6} sm={4} md={3} lg={2}> WomenDress </Col>
					<Col xs={6} sm={4} md={3} lg={2}> OuterWear </Col>
					<Col xs={6} sm={4} md={3} lg={2}> Pants </Col>
					<Col xs={6} sm={4} md={3} lg={2}> Tops </Col>
					<Col xs={6} sm={4} md={3} lg={2}> Skirts </Col>
					<Col xs={6} sm={4} md={3} lg={2}> Shirts </Col>
					<Col xs={6} sm={4} md={3} lg={2}> Face </Col>
					<Col xs={6} sm={4} md={3} lg={2}> Eyes </Col>
					<Col xs={6} sm={4} md={3} lg={2}> Lips </Col>
					<Col xs={6} sm={4} md={3} lg={2}> Snacks </Col>
					<Col xs={6} sm={4} md={3} lg={2}> PetCare </Col>
					<Col xs={6} sm={4} md={3} lg={2}> HomeCleaning </Col>
					<Col xs={6} sm={4} md={3} lg={2}> Dairy </Col>
					<Col xs={6} sm={4} md={3} lg={2}> Cooking </Col>
					<Col xs={6} sm={4} md={3} lg={2}> Breakfast </Col>
					<Col xs={6} sm={4} md={3} lg={2}> Beverage </Col>
					<Col xs={6} sm={4} md={3} lg={2}> BeautyHealth </Col>
					<Col xs={6} sm={4} md={3} lg={2}> ShavingNeeds </Col>
					<Col xs={6} sm={4} md={3} lg={2}> OralCare </Col>
					<Col xs={6} sm={4} md={3} lg={2}> FacialCare </Col>
					<Col xs={6} sm={4} md={3} lg={2}> Deodorant </Col>
					<Col xs={6} sm={4} md={3} lg={2}> BathOil </Col>
					<Col xs={6} sm={4} md={3} lg={2}> Minus </Col>
					<Col xs={6} sm={4} md={3} lg={2}> Chair </Col>
					<Col xs={6} sm={4} md={3} lg={2}> Bed </Col>
					<Col xs={6} sm={4} md={3} lg={2}> BookShelf </Col>
					<Col xs={6} sm={4} md={3} lg={2}> DressingTable </Col>
					<Col xs={6} sm={4} md={3} lg={2}> ReadingTable </Col>
					<Col xs={6} sm={4} md={3} lg={2}> Sofa </Col>
					<Col xs={6} sm={4} md={3} lg={2}> CenterTable </Col>
					<Col xs={6} sm={4} md={3} lg={2}> RelaxChair </Col>
					<Col xs={6} sm={4} md={3} lg={2}> Storage </Col>
					<Col xs={6} sm={4} md={3} lg={2}> Tools </Col>
				</Row>
			</Card>


			<Modal
				title="Category Add"
				visible={categoryModal}
				okButtonProps={{ loading: categoryAddLoading }}
				onOk={() => {
					if (category.title === "") {
						message.error("Type category");
					} else if (category.slug === "") {
						message.error("Slug ?");
					} else if (category.icon === "") {
						message.error("Icon ?");
					} else {
						addCategoryAction(category);
					}
				}}
				onCancel={() => setCategoryModal(false)}
				centered
			>
				<Form layout="vertical">
					<Form.Item label="Category Name">
						<Input
							value={category.title}
							onChange={(e) =>
								setCategory((p) => ({ ...p, title: e.target.value }))
							}
						/>
					</Form.Item>
					<Form.Item label="Slug">
						<Input
							value={category.slug}
							onChange={(e) =>
								setCategory((p) => ({ ...p, slug: e.target.value }))
							}
						/>
					</Form.Item>
					<Form.Item label="Icon">
						<Input
							value={category.icon}
							onChange={(e) =>
								setCategory((p) => ({ ...p, icon: e.target.value }))
							}
						/>
					</Form.Item>
				</Form>
			</Modal>

			<Modal
				title="Category Update"
				visible={updateCategoryModal}
				okButtonProps={{ loading: updateLoading }}
				onOk={() => {
					if (udpatecCat.title === "") {
						message.error("Type category");
					} else if (udpatecCat.slug === "") {
						message.error("Slug ?");
					} else if (udpatecCat.id === "") {
						message.error("Id Not Found ?");
					} else if (udpatecCat.icon === "") {
						message.error("Icon ?");
					} else {
						updateCategoryAction(udpatecCat);
					}
				}}
				onCancel={() => setUpdateCategoryModal(false)}
				centered
			>
				<Form layout="vertical">
					<Form.Item label="Category Name">
						<Input
							value={udpatecCat.title}
							onChange={(e) =>
								setUdpatecCat((p) => ({ ...p, title: e.target.value }))
							}
						/>
					</Form.Item>
					<Form.Item label="Slug">
						<Input
							value={udpatecCat.slug}
							onChange={(e) =>
								setUdpatecCat((p) => ({ ...p, slug: e.target.value }))
							}
						/>
					</Form.Item>
					<Form.Item label="Icon">
						<Input
							value={udpatecCat.icon}
							onChange={(e) =>
								setUdpatecCat((p) => ({ ...p, icon: e.target.value }))
							}
						/>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default Category;
