<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Todo;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="index", methods={"GET"})
     * @Template()
     */
    public function indexAction()
    {
    }

    /**
     * @Route("/xhr/list", name="list", methods={"GET"})
     */
    public function listAction()
    {
        $todos = $this->getDoctrine()->getRepository(Todo::class)->findAllToArray();

        return new JsonResponse($todos);
    }

    /**
     * @Route("/xhr/add", name="add", methods={"POST"})
     */
    public function addAction(Request $request)
    {
        $status = false;
        $message = null;

        $json = json_decode($request->getContent(), true);

        if (isset($json['todo'])) {
            $todo = new Todo();
            $todo->setTodo($json['todo']);

            try {
                $em = $this->getDoctrine()->getManager();
                $em->persist($todo);
                $em->flush();

                $status = true;
            } catch (Exception $e) {
                $message = $e->getMessage();
            }
        }

        return new JsonResponse([
            'status'  => $status,
            'message' => $message
        ]);
    }

    /**
     * @Route("/xhr/delete", name="delete", methods={"DELETE"})
     */
    public function deleteAction(Request $request)
    {
        $status = false;
        $message = null;

        $json = json_decode($request->getContent(), true);

        if (isset($json['id'])) {
            try {
                $em = $this->getDoctrine()->getManager();
                $todo = $em->getRepository(Todo::class)->find($json['id']);

                $em->remove($todo);
                $em->flush();

                $status = true;
            } catch (Exception $e) {
                $message = $e->getMessage();
            }
        }

        return new JsonResponse([
            'status'  => $status,
            'message' => $message
        ]);
    }
}
