.class La/n/ga;
.super Landroid/animation/AnimatorListenerAdapter;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = La/n/ha;->b(Landroid/view/ViewGroup;La/n/M;ILa/n/M;I)Landroid/animation/Animator;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic a:La/n/Q;

.field final synthetic b:Landroid/view/View;

.field final synthetic c:La/n/ha;


# direct methods
.method constructor <init>(La/n/ha;La/n/Q;Landroid/view/View;)V
    .locals 0

    iput-object p1, p0, La/n/ga;->c:La/n/ha;

    iput-object p2, p0, La/n/ga;->a:La/n/Q;

    iput-object p3, p0, La/n/ga;->b:Landroid/view/View;

    invoke-direct {p0}, Landroid/animation/AnimatorListenerAdapter;-><init>()V

    return-void
.end method


# virtual methods
.method public onAnimationEnd(Landroid/animation/Animator;)V
    .locals 1

    iget-object p1, p0, La/n/ga;->a:La/n/Q;

    iget-object v0, p0, La/n/ga;->b:Landroid/view/View;

    invoke-interface {p1, v0}, La/n/Q;->b(Landroid/view/View;)V

    return-void
.end method
