import React, {useState} from 'react';
import {Block} from "@/models/block/Block";
import {Container} from "typedi";
import FormService from "@/Services/FormService/FormService";
import BlockService from "@/Services/BlockService/BlockService";
import CommonService from "@/Services/CommonService/CommonService";
import {Link, router, usePage} from "@inertiajs/react";
import useSnackbarHook from "@/Hooks/SnackbarHook";
import {z} from "zod";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Box, Stack, Typography, Breadcrumbs, SelectChangeEvent, Chip} from "@mui/material";
import ValidatedImage from "@/Components/ValidatedComponents/ValidatedImage";
import ValidatedSwitch from "@/Components/ValidatedComponents/ValidatedSwitch";
import BasicTranslation from "@/Components/Translations/BasicTranslation";
import CustomButton from "@/Components/Button/CustomButton";
import CustomSnackbar from "@/Components/Snackbar/CustomSnackbar";
import DeleteModal from "@/Components/DeleteModal/DeleteModal";
import Project from "@/models/block/Project";
import BlockCategories from "@/Enums/BlockCategories";
import ValidatedInput from "@/Components/ValidatedComponents/ValidatedInput";
import ValidatedSelect from "@/Components/ValidatedComponents/ValidatedSelect";

const ProjectUpdate: React.FC<{category: string, block: Project}> = ({category, block}) => {
    const formService = Container.get(FormService);
    const blockService = Container.get(BlockService);
    const commonService = Container.get(CommonService);
    const [selectedBlock, setSelectedBlock] = useState<Block>({...block});
    const languages = usePage().props.settings.languages;
    const [skills, setSkills] = React.useState<Block []>([]);
    const [libraries, setLibraries] = React.useState<Block[]>([]);
    const [chosenSkills, setChosenSkills] = React.useState<number[]>(block.skills.map(skill => skill.id));
    const [chosenLibraries, setChosenLibraries] = React.useState<number[]>(block.libraries.map(library => library.id));

    //==========================================================================================
    // Get the skills and libraries:
    React.useEffect(() => {
        async function fetchData() {
            try {
                const [skillsRes, librariesRes] = await Promise.all([
                    blockService.getActiveBlocks(commonService.toSnakeCase(BlockCategories.SKILLS)),
                    blockService.getActiveBlocks(commonService.toSnakeCase(BlockCategories.LIBRARIES)),
                ]);

                const [skillsData, librariesData] = await Promise.all([
                    skillsRes.data,
                    librariesRes.data,
                ]);

                setSkills(skillsData);
                setLibraries(librariesData);
            } catch(error) {
                console.log("Error fetching data", error);
            }
        }

        fetchData();
    }, []);
    // =========================================================================================
    // Snackbar configuration section:

    const {snackbar, setSnackbar, handleClose} =
        useSnackbarHook({open: false, message: '', severity: "success"});

    // =========================================================================================
    // Handle Modal for Delete:
    const [openModal, setOpenModal] = useState<boolean>(false);
    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    // =========================================================================================

    const blockSchema = z.object({
        isActive: z.boolean().default(true),
        // Record key is "ar" or "en" of length 2:
        translations: z.record(z.string().length(2),z.object({
            name: z.string().min(3, {message: 'Title should be at least 3 characters!'}),
            // brief: z.string().min(10),
            // description: z.string().max(100, {message: " Description shouldn't exceed 100 characters!"})
            // description: z.string().min(10),
        })),
        skills: z.array(z.number()).min(1, "You must choose at least one skill!"),
        libraries: z.array(z.number()).min(1, "You must choose at least one library!"),
        github: z.string()
            .url('Invalid Github URL!')
            .refine((val) => /^https:\/\/(www\.)?github\.com\//.test(val), {
                message: 'Github URL is invalid!',
            }),
        preview: z.string().url('Invalid URL!'),
    });

    type blockSchemaType = z.infer<typeof blockSchema>;

    //TODO: comply methods with z.infer type:
    const methods = useForm({
        mode: "onBlur",
        reValidateMode: "onBlur",
        resolver: zodResolver(blockSchema),
        defaultValues: {
            isActive: selectedBlock.isActive,
            image: (selectedBlock.images[0].url as (File | string)),
            translations: blockService.getTranslationsDetails(selectedBlock.translations),
            skills: chosenSkills,
            libraries: chosenLibraries,
            github: block.links.github,
            preview: block.links.preview,
        }
    });

    // =========================================================================================
    // Handle image upload:

    const onUpload = () => {
        const imageId = selectedBlock.images.find(img => img.isCover)?.id || -1;
        const formData = new FormData();
        console.log('HERE!', methods.getValues('image'));
        formData.append('image', (methods.getValues('image') as Blob));
        formData.append('imageId', String(imageId));
        blockService.uploadImage(formData, block.id).then(response => {
            setSelectedBlock(response.data);
            setSnackbar(snackbarState =>
                ({ ...snackbarState, open: true, message: 'Image has been updated!', severity: "success" })
            );
        }).catch(error => {
            setSnackbar(snackbarState =>
                ({ ...snackbarState, open: true, message: 'Error Happened while uploading image!', severity: "error" })
            );
        })
    }

    // =========================================================================================
    // Handle delete block

    const deleteBlock = () => {
        setOpenModal(false);
        blockService.deleteBlock(block.id)
            .then(response => {
                setSnackbar(snackbarState =>
                    ({ ...snackbarState, open: true, message: 'Block has been deleted!', severity: "success" })
                );
                router.get('/admin/get-block/' + block.category);
            })
            .catch(error => {
                setSnackbar(snackbarState =>
                    ({ ...snackbarState, open: true, message: 'Error Happened while deleting block!', severity: "error" })
                );
            })
    }

    // =========================================================================================
    // Handle Switch button:

    const receiveSwitchState = (value: boolean) => {
        const formData = new FormData();
        formData.append('isActive', String(value));

        blockService.blockActivation(formData, block.id).then(response => {
            setSelectedBlock(response.data);
            setSnackbar(snackbarState =>
                ({ ...snackbarState, open: true, message: 'Block status has been successfully updated!', severity: "success" })
            );
        }).catch(error => {
            setSnackbar(snackbarState =>
                ({ ...snackbarState, open: true, message: 'Error Happened while updating block status!', severity: "error" })
            );
        })
    }

    const onSubmit =  () => {
        const formData = new FormData();
        formData.append('isActive', String(methods.getValues('isActive')));
        formData.append('translations', JSON.stringify(methods.getValues('translations')));
        formData.append('blockId', String(block.id));
        formData.append('github', methods.getValues('github'));
        formData.append('preview', methods.getValues('preview'));
        chosenSkills.forEach(id => formData.append('skills[]', id.toString()));
        chosenLibraries.forEach(id => formData.append('libraries[]', id.toString()));

        blockService.updateBlock(formData, block.id).then(response => {
            setSelectedBlock(response.data);
            setSnackbar(snackbarState =>
                ({ ...snackbarState, open: true, message: 'The block has been updated', severity: "success" })
            );
        }).catch(error => {
            setSnackbar(snackbarState =>
                ({ ...snackbarState, open: true, message: 'Error Happened while updating block', severity: "error" })
            );
        })
    }

    const handleSkillsChange = (event: SelectChangeEvent<unknown>) => {
        // setChosenSkills(chosenSkills => [...chosenSkills, event.target.value]);
        setChosenSkills(event.target.value as number[]);
        console.log('chosen skills: ', methods.getValues('skills'));
    }

    const handleLibrariesChange = (event: SelectChangeEvent<unknown>) => {
        setChosenLibraries(event.target.value as number[]);
        console.log('chosen libraries: ', methods.getValues('libraries'));
    }

    React.useEffect(() => {
        methods.getValues('image');
    }, [methods]);
    return (
        <Box>
            <Breadcrumbs>
                <Link href={`/admin/get-block/` + block.category}>Back to {commonService.toTitleCase(block.category)}</Link>
                <Typography>Update {blockService.getBlockName(selectedBlock)}</Typography>
            </Breadcrumbs>
            <Box className="p-[16px]">
                <Typography variant="h5">Update {blockService.getBlockName(selectedBlock)}</Typography>
            </Box>

            <FormProvider {...methods}>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <ValidatedImage
                        controllerName="image"
                        methods={methods}
                        image={blockService.getBlockImage(block)}
                        onUpload={onUpload}
                    />

                    <ValidatedSwitch
                        controlName="isActive"
                        name="isActive"
                        id="isActive"
                        color="secondary"
                        methods={methods}
                        label="Is Active"
                        sendSwitchState={(value) => receiveSwitchState(value)}
                    />

                    <ValidatedInput
                        controlName='github'
                        name='github'
                        id='github'
                        label={`GitHub URL`}
                        placeholder={`GitHub URL`}
                        control={methods.control}
                    />

                    <ValidatedInput
                        controlName='preview'
                        name='preview'
                        id='preview'
                        label={`Preview URL`}
                        placeholder={`Preview URL`}
                        control={methods.control}
                    />

                    {skills.length > 0 && <ValidatedSelect
                        control={methods.control}
                        controlName='skills'
                        id="skills"
                        label="Skills"
                        placeholder="Skills"
                        selectChanged={handleSkillsChange}
                        multiple={true}
                        withNone={false}
                        value={chosenSkills}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {(selected as number []).map((value) => (
                                    <Chip key={value} label={blockService.getBlockNameById(value, skills)} />
                                ))}
                            </Box>
                        )}
                        items={
                            skills.map(
                                skill => ({
                                    id: skill.id,
                                    name: blockService.getBlockName(skill),
                                })
                            )
                        }
                    />}

                    {libraries.length > 0 && <ValidatedSelect
                        control={methods.control}
                        controlName='libraries'
                        id="libraries"
                        label="Libraries"
                        placeholder="Libraries"
                        selectChanged={handleLibrariesChange}
                        multiple={true}
                        withNone={false}
                        value={chosenLibraries}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {(selected as number []).map((value) => (
                                    <Chip key={value} label={blockService.getBlockNameById(value, libraries)} />
                                ))}
                            </Box>
                        )}
                        items={
                            libraries.map(
                                skill => ({
                                    id: skill.id,
                                    name: blockService.getBlockName(skill),
                                })
                            )
                        }
                    />}

                    {/*<ValidatedSelect*/}
                    {/*    control={methods.control}*/}
                    {/*    controlName='parent'*/}
                    {/*    id="parent"*/}
                    {/*    label="Parent Category"*/}
                    {/*    placeholder="Parent Category"*/}
                    {/*    items={categoryService.getAllTranslations(selectedCategories)}*/}
                    {/*/>*/}

                    <BasicTranslation
                        methods={methods}
                        category={commonService.toTitleCase(category)}
                    />
                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={2}
                        className="m-[8px]"
                    >
                        <CustomButton task="update" text={commonService.toTitleCase(category)}></CustomButton>
                        <CustomButton task="delete" text={commonService.toTitleCase(category)} onClick={handleOpenModal}></CustomButton>
                    </Stack>
                </Box>
            </FormProvider>
            <CustomSnackbar
                open={snackbar.open}
                message={snackbar.message}
                onClose={handleClose}
                severity={snackbar.severity}
            />

            <DeleteModal
                open={openModal}
                onClose={handleCloseModal}
                message={`Are you sure that you want to delete ${blockService.getBlockName(selectedBlock)}`}
                confirmDelete={deleteBlock}
            ></DeleteModal>
        </Box>
    );
}

export default ProjectUpdate;
