.class La/j/a/r;
.super Landroid/animation/AnimatorListenerAdapter;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = La/j/a/t;->b(La/j/a/g;)V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic a:Landroid/view/ViewGroup;

.field final synthetic b:Landroid/view/View;

.field final synthetic c:La/j/a/g;

.field final synthetic d:La/j/a/t;


# direct methods
.method constructor <init>(La/j/a/t;Landroid/view/ViewGroup;Landroid/view/View;La/j/a/g;)V
    .locals 0

    iput-object p1, p0, La/j/a/r;->d:La/j/a/t;

    iput-object p2, p0, La/j/a/r;->a:Landroid/view/ViewGroup;

    iput-object p3, p0, La/j/a/r;->b:Landroid/view/View;

    iput-object p4, p0, La/j/a/r;->c:La/j/a/g;

    invoke-direct {p0}, Landroid/animation/AnimatorListenerAdapter;-><init>()V

    return-void
.end method


# virtual methods
.method public onAnimationEnd(Landroid/animation/Animator;)V
    .locals 2

    iget-object v0, p0, La/j/a/r;->a:Landroid/view/ViewGroup;

    iget-object v1, p0, La/j/a/r;->b:Landroid/view/View;

    invoke-virtual {v0, v1}, Landroid/view/ViewGroup;->endViewTransition(Landroid/view/View;)V

    invoke-virtual {p1, p0}, Landroid/animation/Animator;->removeListener(Landroid/animation/Animator$AnimatorListener;)V

    iget-object p1, p0, La/j/a/r;->c:La/j/a/g;

    iget-object p1, p1, La/j/a/g;->K:Landroid/view/View;

    if-eqz p1, :cond_0

    const/16 v0, 0x8

    invoke-virtual {p1, v0}, Landroid/view/View;->setVisibility(I)V

    :cond_0
    return-void
.end method
